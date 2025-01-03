use prost::Message;
use proto::compiler::{code_generator_response, CodeGeneratorRequest, CodeGeneratorResponse};
use std::fs::File;
use std::io::{self, Read, Write};
use std::time::{SystemTime, UNIX_EPOCH};

mod proto;

fn dump<T: Message>(msg: &T, filename: &str) {
    let requests_str = format!("{:#?}", msg);
    let start = SystemTime::now();
    let since_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let timestamp = since_epoch.as_secs();
    let filename_with_timestamp =
        format!("{}-{}-{}.output.rs", filename, timestamp, rand::random::<u8>());
    let mut file = File::create(filename_with_timestamp).expect("failed to create file");
    file.write_all(requests_str.as_bytes())
        .expect("failed to write to file");
}

pub fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut buf = Vec::new();
    io::stdin().read_to_end(&mut buf)?;

    let requests =
        CodeGeneratorRequest::decode(&*buf).expect("failed to decode CodeGeneratorRequest");

    dump(&requests, "requests");

    let mut response = CodeGeneratorResponse::default();
    response.supported_features = Some(
        code_generator_response::Feature::Proto3Optional as u64
            | code_generator_response::Feature::SupportsEditions as u64,
    );
    io::stdout().write(&response.encode_to_vec())?;
    Ok(())
}
