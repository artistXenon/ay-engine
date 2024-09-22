use std::{fs::{self, File}, io::{self, ErrorKind, Write}};

pub fn read_file_or_default(path:&str, default_content: &str) -> Result<String, io::Error> {
    match fs::read_to_string(path) {
        Ok(existing_content) => Ok(existing_content),
        Err(e) => {
            if e.kind() == ErrorKind::NotFound {
                let _ = write_file(path, default_content)?;
                return Ok(default_content.to_string());
            }
            Err(e)
        }
    }
}

pub fn write_file(path:&str, default_content: &str) -> Result<(), io::Error> {
    let mut created_file = File::create(path)?; 
    created_file.write_all(default_content.as_bytes())?;
    Ok(())
}
