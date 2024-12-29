const protoc = require("../");
const path = require("node:path");
const fs = require("node:fs");

test("is protoc installed!", (done) => {
  protoc(["--version"], (err, stdout, stderr) => {
    if (err) {
      return done(err);
    }
    expect(stdout).toContain("libprotoc");
    expect(stdout).toContain(process.env.PROTOC_VERSION || "29.2");
    done();
  });
});

test("will protoc fail on invalid arguments!", (done) => {
  protoc(["--invalid"], (err, stdout, stderr) => {
    expect(err).not.toBeNull();
    expect(err.code).toBe(1);
    done();
  });
});

test("will protoc work with a proto file!", (done) => {
  const resultDir = path.resolve(__dirname, "./pb");
  const dataDir = path.resolve(__dirname, "../../examples");
  const dataFile = path.resolve(dataDir, "simple.proto");

  if (fs.existsSync(resultDir)) {
    fs.rmSync(resultDir, { recursive: true });
  }
  fs.mkdirSync(resultDir, { recursive: true });

  protoc(
    [
      `--js_out=import_style=commonjs,binary:${resultDir}`,
      `--proto_path=${dataDir}`,
      dataFile,
    ],
    (err, stdout, stderr) => {
      if (err) {
        return done(err);
      }

      const outputFile = path.resolve(__dirname, "./pb/simple_pb.js");
      expect(fs.existsSync(outputFile)).toBeTruthy();
      fs.rmSync(resultDir, { recursive: true });
      done()
    }
  );
});
