import chalk from 'chalk';
import util from 'util';

export class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        this.context = {};
        this.logTypes = {
            success: 'green',
            custom: 'magenta',
            error: 'red',
            warning: 'yellow',
            info: 'blue'
        };
    }

    setContext(context) {
        this.context = { ...this.context, ...context };
    }

    log(type, ...args) {
        const { message, color } = this.parseArgs(args, type);
        const logParts = this.buildLogParts(message, type);
        const fullMessage = this.formatFullMessage(logParts);
        console.log(this.applyColor(fullMessage, color));
    }

    parseArgs(args, type) {
        let color = this.logTypes[type] || this.logTypes.info;
        let message = args;

        // Nếu màu được chỉ định rõ ràng, sử dụng nó thay vì màu mặc định của loại
        if (typeof args[args.length - 1] === 'string' && Object.values(this.logTypes).includes(args[args.length - 1])) {
            color = args.pop();
            message = args;
        }

        return { message, color };
    }

    buildLogParts(message, type) {
        const now = new Date();
        const time = now.toLocaleString("en-US", {
            year: "2-digit", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        });

        return {
            time: `[${time}]`,
            //type: `[${type.toUpperCase()}]`,
            context: this.formatContext(),
            message: this.formatMessage(message),
            args: this.formatArgs(message)
        };
    }

    formatContext() {
        return Object.entries(this.context)
            .map(([key, value]) => `[${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}]`)
            .join(' ');
    }

    // formatMessage(message) {
    //     return message.map(arg => 
    //         typeof arg === 'object' ? util.inspect(arg, { depth: null }) : String(arg)
    //     ).join(' ');
    // }
    formatMessage(message) {
        return message.map(arg => 
            arg instanceof Error ? arg.message : 
            (typeof arg === 'object' ? util.inspect(arg, { depth: null, colors: true }) : String(arg))
        ).join(' ');
    }

    // formatArgs(args) {
    //     if (args.length <= 1) return '';
    //     const detailedArgs = args.filter(arg => typeof arg === 'object' && !(arg instanceof Error));
    //     if (detailedArgs.length === 0) return '';
    //     return `\nDetails: ${detailedArgs.map((arg, index) => 
    //         `\n  [${index}]: ${util.inspect(arg, { depth: null })}`
    //     ).join('')}`;
    // }
    formatArgs(args) {
        return ''; // Trả về chuỗi rỗng để không hiển thị phần "Details"
    }

    formatFullMessage(parts) {
        return `${parts.time} ${parts.context} ${parts.message}${parts.args}`;
    }

    applyColor(text, color) {
        return chalk[color](text);
    }

    // Convenience methods for different log types
    success(...args) { this.log('success', ...args); }
    custom(...args) { this.log('custom', ...args); }
    error(...args) { this.log('error', ...args); }
    warning(...args) { this.log('warning', ...args); }
    info(...args) { this.log('info', ...args); }
}

export const logger = new Logger();