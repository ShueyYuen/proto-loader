use prost::Message;
use prost_types::compiler::{CodeGeneratorRequest, CodeGeneratorResponse};
use std::io::{self, Read};

pub fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut buf = Vec::new();
    io::stdin().read_to_end(&mut buf)?;
    println!("{:?}", buf);

    let requests =
        CodeGeneratorRequest::decode(&buf[..]).expect("failed to decode CodeGeneratorRequest");

    println!("{:?}", requests);
    Ok(())
}
