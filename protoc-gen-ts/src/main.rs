mod proto;

use prost::Message;
use proto::compiler::{CodeGeneratorRequest, CodeGeneratorResponse, code_generator_response};
use std::fs::File;
use std::io::{self, Read, Write};
use std::time::{SystemTime, UNIX_EPOCH};

pub fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut buf = Vec::new();
    io::stdin().read_to_end(&mut buf)?;

    let requests =
        CodeGeneratorRequest::decode(&buf[..]).expect("failed to decode CodeGeneratorRequest");

    let requests_str = format!("{:#?}", requests);
    let start = SystemTime::now();
    let since_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let timestamp = since_epoch.as_secs();
    let filename = format!("{}.output.rs", timestamp);
    let mut file = File::create(filename)?;
    file.write_all(requests_str.as_bytes())?;

    let mut response = CodeGeneratorResponse::default();
    response.supported_features = Some(
        code_generator_response::Feature::Proto3Optional as u64 |
        code_generator_response::Feature::SupportsEditions as u64
    );
    io::stdout().write_all(&response.encode_to_vec())?;
    Ok(())
}
