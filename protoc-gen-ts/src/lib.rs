use prost_types::{DescriptorProto, FieldDescriptorProto, FileDescriptorProto};

pub struct ProtoToTsConverter {
    pub output: String,
}

impl ProtoToTsConverter {
    pub fn new() -> Self {
        ProtoToTsConverter {
            output: String::new(),
        }
    }

    pub fn convert(&mut self, file_descriptor: &FileDescriptorProto) {
        for message in &file_descriptor.message_type {
            self.generate_interface(message);
        }
    }

    fn generate_interface(&mut self, message: &DescriptorProto) {
        let ts_interface_name = &message.name;
        self.output.push_str(&format!("interface {} {{\n", ts_interface_name));

        for field in &message.field {
            let ts_type = match field.r#type {
                FieldDescriptorProto::TypeString => "string".to_string(),
                FieldDescriptorProto::TypeInt32 => "number".to_string(),
                // ... handle other types
                _ => "any".to_string(), // Default type if not handled
            };
            let field_name = field.name.as_ref().unwrap_or(&String::new());
            self.output.push_str(&format!("  {}: {};\n", field_name, ts_type));
        }

        self.output.push_str("}\n\n");
    }
}