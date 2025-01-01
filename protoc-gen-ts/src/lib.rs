// use prost_types::{DescriptorProto, FileDescriptorProto};

pub struct ProtoToTsConverter {
    pub output: String,
}

impl ProtoToTsConverter {
    pub fn new() -> Self {
        ProtoToTsConverter {
            output: String::new(),
        }
    }

    // pub fn convert(&mut self, file_descriptor: &FileDescriptorProto) {
    //     for message in &file_descriptor.message_type {
    //         self.generate_interface(message);
    //     }
    // }

    // fn generate_interface(&mut self, message: &DescriptorProto) {
    // }
}