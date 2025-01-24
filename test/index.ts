//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEventTest } from "./XEvent.Test"
import { XCollectTest } from "./XCollect.Test"
import { XEnvTest } from "./XEnv.Test"
import { XFileTest } from "./XFile.Test"
import { XLogTest } from "./XLog.Test"
import { XObjectTest } from "./XObject.Test"
import { XStringTest } from "./XString.Test"
import { XTimeTest } from "./XTime.Test"
import { XUtilityTest } from "./XUtility.Test"

export * from "./XEvent.Test"
export * from "./XCollect.Test"
export * from "./XEnv.Test"
export * from "./XFile.Test"
export * from "./XLog.Test"
export * from "./XObject.Test"
export * from "./XString.Test"
export * from "./XTime.Test"
export * from "./XUtility.Test"

export function TestAll() {
    XEnvTest()
    XCollectTest()
    XEventTest()
    XFileTest()
    XLogTest()
    XObjectTest()
    XStringTest()
    XTimeTest()
    XUtilityTest()
}