export class ErrorFH {
    errorType: string;
    errorMessage: string;

    constructor(errorType: string, errorMessage: string) {
        this.errorType = errorType;
        this.errorMessage = errorMessage;
    }

    logError(): void {
        console.error(`Error [${this.errorType}]: ${this.errorMessage}`);
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}