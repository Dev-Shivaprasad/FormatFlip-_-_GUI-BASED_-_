use rfd;
use std::{
    path::PathBuf,
    process::Command,
    vec,
};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn numthreads() -> usize {
    num_cpus::get()
}

#[tauri::command]
fn process_images(
    inputdirectory: &str,
    outputdirectory: &str,
    inputformat: &str,
    outputformat: &str,
    numberofprocessors: usize,
)->bool {
    let _result = Command::new("./custbin/Formatflip.exe")
        .arg(inputdirectory)
        .arg(outputdirectory)
        .arg("--input-ext")
        .arg(inputformat)
        .arg("--output-ext")
        .arg(outputformat)
        .arg("--threads")
        .arg(numberofprocessors.to_string())
        .output();
    true
}

// fn stop_processing(){
//     Command::
// }

#[tauri::command]
fn getfolder() -> String {
    // Command::get_program("./custbin/Formatflip.exe")
    let _folder: Option<std::path::PathBuf> =
        rfd::FileDialog::new().set_directory(".").pick_folder();
    match _folder {
        Some(path) => {
            return path.to_string_lossy().to_string();
        }
        None => {
            return ("No directory selected").to_string();
        }
    }
}

#[tauri::command]
fn getfile() -> String {
    // Command::get_program("./custbin/Formatflip.exe")
    let _file: Option<PathBuf> = rfd::FileDialog::new().pick_file();
    match _file {
        Some(path) => return path.to_string_lossy().to_string(),
        None => {
            return ("No Image selected").to_string();
        }
    }
}

// "E:\Test\raw" "E:\Test\conv" --input-ext ".cr3" --output-ext ".jpg" --threads 4
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            process_images,
            numthreads,
            getfolder,
            getfile,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
