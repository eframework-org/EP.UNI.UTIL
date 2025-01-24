//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEnv } from "../src/XEnv"
import { XTest } from "../src/XTest"

export const XEnvTest = XTest.Test("XEnv", async () => {
    XTest.Expect(XEnv.DataPath, "DataPath").Not.ToBe("Unknown")
    if (XEnv.IsNode) {
        const path = require("path")
        if (process.platform == "win32") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Windows)
        else if (process.platform == "linux") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Linux)
        else if (process.platform == "darwin") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.OSX)
        else if (process.platform == "android") XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Android)
        else XTest.Expect(XEnv.Platform, "Platform").ToBe(XEnv.PlatformType.Unknown)

        let pkg = require(path.join(__dirname, "../package.json"))
        XTest.Expect(XEnv.Product, "Product").ToEqual(pkg.displayName)
        XTest.Expect(XEnv.Author, "Author").ToEqual(pkg.author)
        XTest.Expect(XEnv.Identifier, "Identifier").ToEqual(pkg.name)
        XTest.Expect(XEnv.Version, "Version").ToEqual(pkg.version)
    } else if (XEnv.IsCocos) {
        XTest.Expect(typeof cc != "undefined", "IsCocos").ToBe(true)
    } else if (XEnv.IsUnity) {
        XTest.Expect(typeof CS != "undefined", "IsUnity").ToBe(true)
    } else if (XEnv.IsUnreal) {
        XTest.Expect(typeof UE != "undefined", "IsUnreal").ToBe(true)
    }
})