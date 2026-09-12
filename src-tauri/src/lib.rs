use std::sync::Mutex;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn health() -> bool {
    ufodb_v0::Ufdb::new().is_empty()
}

#[tauri::command]
fn make_set(key: String, state: tauri::State<Mutex<ufodb_v0::Ufdb>>) -> bool {
    let mut ufdb = state.lock().unwrap();
    ufdb.make_set(&key)
}

#[tauri::command]
fn unite(key_a: String, key_b: String, state: tauri::State<Mutex<ufodb_v0::Ufdb>>) -> bool {
    let mut ufdb = state.lock().unwrap();
    ufdb.unite(&key_a, &key_b)
}

#[tauri::command]
fn groups(state: tauri::State<Mutex<ufodb_v0::Ufdb>>) -> Vec<Vec<String>> {
    let mut ufdb = state.lock().unwrap();

    let mut groups: Vec<Vec<String>> = ufdb
        .groups()
        .into_values()
        .map(|group| group.into_iter().cloned().collect())
        .collect();

    for group in &mut groups {
        group.sort();
    }

    groups.sort_by(|a, b| b.len().cmp(&a.len()));

    groups
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(ufodb_v0::Ufdb::new()))
        // .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            health,
            make_set,
            unite,
            groups])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
