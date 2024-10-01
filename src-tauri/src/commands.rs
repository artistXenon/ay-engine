#[path = "file.rs"] mod file;

use std::process;
use tauri::{command, AppHandle, Manager, PhysicalSize};
use file::{read_file_or_default, write_file};

const CONFIG_FILE_NAME: &str = "config.json";
const SAVE_FILE_NAME: &str = "save.json";

#[command]
pub fn get_config_file(default_config: &str) -> String {
    match read_file_or_default(CONFIG_FILE_NAME, default_config) {
        Ok(result) => result,
        Err(e) => {
            panic!("get_config_file: failed to read file due to: {}", e.to_string());
        }
    }
}

#[command]
pub fn get_save_file(default_save: &str) -> String {
    match read_file_or_default(SAVE_FILE_NAME, default_save) {
        Ok(result) => result,
        Err(e) => {
            panic!("get_save_file: failed to read file due to: {}",  e.to_string());
        }
    }
}

#[command]
pub fn set_config_file(update_config: &str) {
    let _ = write_file(CONFIG_FILE_NAME, update_config);
}

#[command]
pub fn set_save_file(update_save: &str) {
    let _ = write_file(SAVE_FILE_NAME, update_save);
}

#[command]
pub fn panic(error: &str) {
    panic!("webview has reported an error:\n{}", error);
}

#[command]
pub fn quit_game() {
    process::exit(0);
}

#[command]
pub fn resize_window(app: AppHandle, width: i32, height: i32) {
    let window = app.get_webview_window("main");
    if let Some(window) = window {
        let _ = window.set_size(PhysicalSize::new(width, height));
    }
}

// #[tauri::command]
// fn greet(name: &str) -> String {
//     let greetings = format!("Hello, {}! You've been greeted from Rust!", name);
//     println!("{}", greetings);
//     greetings
// }

// #[tauri::command]
// fn throwing_function(throwit: bool) -> Result<String, String> {
//     if !throwit {
//         Ok("wow no error".to_string())
//     } else {
//         Err("omg real error".to_string())
//     }
// }
