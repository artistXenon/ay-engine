// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use commands::*;
use tauri::{ Builder, Emitter, Manager };

mod commands;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        // INFO: if debug mode, open devtools on start up
        .setup(|app| { 
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })

        // INFO: resctirct application to single instance
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| 
            app.emit("single-instance", Payload { args: argv, cwd }).unwrap()
        ))

        // TODO: understand what this does
        .plugin(tauri_plugin_shell::init())

        // INFO: defines command interface accesible from js webview
        .invoke_handler(tauri::generate_handler![
            get_config_file, get_save_file,
            set_config_file, set_save_file,
            resize_window,
            panic, quit_game
        ])

        .run(tauri::generate_context!())
        .expect("[:root] unexpected error");
}
