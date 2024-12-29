// source: test.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.com.example.Player', null, global);
goog.exportSymbol('proto.com.example.Player.Handed', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.example.Player = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.com.example.Player.repeatedFields_, null);
};
goog.inherits(proto.com.example.Player, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.com.example.Player.displayName = 'proto.com.example.Player';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.example.Player.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.example.Player.prototype.toObject = function(opt_includeInstance) {
  return proto.com.example.Player.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.example.Player} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.example.Player.toObject = function(includeInstance, msg) {
  var f, obj = {
name: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
id: jspb.Message.getFieldWithDefault(msg, 2, 0),
scoresList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
handed: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.example.Player}
 */
proto.com.example.Player.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.example.Player;
  return proto.com.example.Player.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.example.Player} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.example.Player}
 */
proto.com.example.Player.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 3:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedInt32() : [reader.readInt32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addScores(values[i]);
      }
      break;
    case 4:
      var value = /** @type {!proto.com.example.Player.Handed} */ (reader.readEnum());
      msg.setHanded(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.example.Player.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.example.Player.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.example.Player} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.example.Player.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getScoresList();
  if (f.length > 0) {
    writer.writePackedInt32(
      3,
      f
    );
  }
  f = /** @type {!proto.com.example.Player.Handed} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.com.example.Player.Handed = {
  HANDED_UNSPECIFIED: 0,
  HANDED_LEFT: 1,
  HANDED_RIGHT: 2,
  HANDED_AMBIDEXTROUS: 3
};

/**
 * optional string name = 1;
 * @return {string}
 */
proto.com.example.Player.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.setName = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.clearName = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.example.Player.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 id = 2;
 * @return {number}
 */
proto.com.example.Player.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated int32 scores = 3;
 * @return {!Array<number>}
 */
proto.com.example.Player.prototype.getScoresList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.setScoresList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.addScores = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.clearScoresList = function() {
  return this.setScoresList([]);
};


/**
 * optional Handed handed = 4;
 * @return {!proto.com.example.Player.Handed}
 */
proto.com.example.Player.prototype.getHanded = function() {
  return /** @type {!proto.com.example.Player.Handed} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.com.example.Player.Handed} value
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.setHanded = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.example.Player} returns this
 */
proto.com.example.Player.prototype.clearHanded = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.example.Player.prototype.hasHanded = function() {
  return jspb.Message.getField(this, 4) != null;
};


goog.object.extend(exports, proto.com.example);
