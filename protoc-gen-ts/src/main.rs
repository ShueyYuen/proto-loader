use std::io::{self, Read};

pub fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut buf = Vec::new();
    io::stdin().read_to_end(&mut buf)?;
    println!("{:?}", buf);
    Ok(())
}