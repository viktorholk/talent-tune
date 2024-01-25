import correlationId from "correlation-id";
import moment from "moment";
import _ from "lodash";

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export default class Logger {
  static debug(message: any, data?: any) {
    Logger.log(LogLevel.DEBUG, message, data, "\x1b[37m");
  }

  static info(message: any, data?: any) {
    Logger.log(LogLevel.INFO, message, data, "\x1b[34m");
  }

  static warn(message: any, data?: any) {
    Logger.log(LogLevel.WARN, message, data, "\x1b[33m");
  }

  static error(message: any, data?: any) {
    Logger.log(LogLevel.ERROR, message, data, "\x1b[31m");
  }

  private static log(
    level: LogLevel,
    message: any,
    data?: any,
    levelColor?: string
  ) {
    const id = correlationId.getId() || "server";

    console.log(
      `[${moment().format("D/M/YYYY HH:mm:ss")}] (${id}) ${levelColor}${LogLevel[level]
      }\x1b[0m: ${message}`
    );
    if (!_.isEmpty(data)) console.log(JSON.stringify(data, null, 4));
  }
}
