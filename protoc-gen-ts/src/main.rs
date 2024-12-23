use prost::Message;
use prost_types::{CodeGeneratorRequest, CodeGeneratorResponse};
use std::io::{self, Write};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut request = CodeGeneratorRequest::decode(&mut io::stdin())?;
    let mut output_file = String::new();

    for proto_file in request.proto_file.iter() {
        for message_type in &proto_file.message_type {
            let ts_interface_name = &message_type.name;
            output_file.push_str(&format!("interface {} {{\n", ts_interface_name));

            for field in &message_type.field {
                let ts_type = match field.r#type {
                    prost_types::field_descriptor_proto::Type::TypeString => "string".to_string(),
                    prost_types::field_descriptor_proto::Type::TypeInt32 => "number".to_string(),
                    // ... handle other types
                    _ => "any".to_string(), // Default type if not handled
                };
                let field_name = field.name.as_ref().unwrap_or(&String::new());
                output_file.push_str(&format!("  {}: {};\n", field_name, ts_type));
            }

            output_file.push_str("}\n\n");
        }
    }

    // 4. 构建 protoc 的输出 (CodeGeneratorResponse)
    let mut response = CodeGeneratorResponse::default();
    response.file.push(prost_types::code_generator_response::File {
        name: Some("output.d.ts".to_string()),
        content: Some(output_file),
        ..Default::default()
    });

    let encoded_response = prost::encode::encode_to_vec(&response);
    io::stdout().write_all(&encoded_response)?;

    Ok(())
}