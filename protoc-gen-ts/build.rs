use prost_build::Config;
use std::error::Error;
use std::path::{Path, PathBuf};
use std::{env, fs};

fn main() -> Result<(), Box<dyn Error>> {
    env::set_var("PROTOC", protobuf_src::protoc());

    let out_dir = "src/proto";
    if !(Path::new(out_dir)).exists() {
        fs::create_dir_all(out_dir).expect("Create output directory failed");
    }

    let includes_dir = protobuf_src::include();
    let required_protos = vec![
        "google/protobuf/descriptor.proto",
        "google/protobuf/compiler/plugin.proto",
    ];

    Config::new()
        .compile_well_known_types()
        .out_dir(out_dir)
        .compile_protos(
            &required_protos
                .iter()
                .map(|p| includes_dir.join(p))
                .collect::<Vec<PathBuf>>(),
            &[includes_dir],
        )?;

    // Generate the mod.rs file
    let mod_file = format!("{}/mod.rs", out_dir);
    let mod_content = required_protos
        .iter()
        .map(|file| format!("pub mod {};", file.replace("/", ".").trim_end_matches(".proto")))
        .collect::<Vec<_>>()
        .join("\n");
    fs::write(&mod_file, mod_content).unwrap();

    println!("cargo:rerun-if-changed=build.rs");

    Ok(())
}
