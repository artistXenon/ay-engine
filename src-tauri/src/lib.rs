// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::{env, fs::{self, File}, io::{ErrorKind, Write}, process};


const CONFIG_FILE_NAME: &str = "config.json";

#[tauri::command]
fn get_config_file(default_config: &str) -> String {
    // match env::current_dir() {
    //     Ok(path) => {
    //         match path.into_os_string().into_string() {
    //             Ok(path) => println!("now i know where i am {}", path),
    //             Err(_) => println!("idk where i am wtf")
    //         }
    //     },
    //     Err(_) => println!("idk where i am")
    // }

    let read_config_file = fs::read_to_string(CONFIG_FILE_NAME);
    match read_config_file {
        Ok(config_value) => config_value,
        Err(e) => {
            match e.kind() {
                ErrorKind::NotFound => {
                    match File::create(CONFIG_FILE_NAME) {
                        Ok(mut created_file) => {
                            match created_file.write_all(default_config.as_bytes()) {
                                Ok(_) => default_config.to_string(),
                                Err(e) => {
                                    // TODO: write error to error.txt
                                    println!("get_config_file: failed to write default config to new config file due to: {}", e.kind());
                                    process::exit(1);
                                }
                            }
                        },
                        Err(e) => {
                            // TODO: write error to error.txt
                            println!("get_config_file: failed to create new config file due to: {}", e.kind());
                            process::exit(1);
                        }
                    }
                },
                ek => {
                    // TODO: write error to error.txt
                    println!("get_config_file: failed to read config file due to: {}", ek.to_string());
                    process::exit(1);
                }
            }
        },
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    let greetings = format!("Hello, {}! You've been greeted from Rust!", name);
    println!("{}", greetings);
    greetings
}

#[tauri::command]
fn throwing_function(throwit: bool) -> Result<String, String> {
    if !throwit {
        Ok("wow no error".to_string())
    } else {
        Err("omg real error".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_config_file, greet, throwing_function])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
