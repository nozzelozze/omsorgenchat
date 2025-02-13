import OpenAI from "openai";

class Api
{
    private openai: OpenAI
    private thread?: OpenAI.Beta.Threads.Thread
    private run?: OpenAI.Beta.Threads.Runs.Run

    constructor()
    {
        this.openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
        this.initialize()
    }

    private async initialize()
    {
        this.thread = await this.openai.beta.threads.create()
    }
    
    newThread = async () =>
    {
        this.thread = await this.openai.beta.threads.create()
    }

    runStatus = async (): Promise<OpenAI.Beta.Threads.Messages.ThreadMessagesPage | undefined> =>
    {
        const checkRunStatus = async (resolve: any, reject: any) => {
            if (!this.thread || !this.run) {
                reject("Thread or run is not defined");
                return;
            }
    
            let run;
            try {
                run = await this.openai.beta.threads.runs.retrieve(
                    this.thread.id,
                    this.run.id
                );
            } catch (error) {
                reject(error);
                return;
            }
    
            //console.log("Run Status: ", run.status);
    
            if (run.status === "completed") {
                const messages = await this.openai.beta.threads.messages.list(this.thread.id);
                //console.log("Run is completed\nMessages: ", messages);
                resolve(messages);
            } else {
                setTimeout(() => checkRunStatus(resolve, reject), 500);
            }
        };
    
        return new Promise((resolve, reject) => {
            checkRunStatus(resolve, reject);
        });
    }

    runAssistant = async () =>
    {
        if (!this.thread)
            return

        const run = await this.openai.beta.threads.runs.create(
            this.thread.id,
            {
                assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
            }
        )
        this.run = run

        //console.log("Run assistant: ", run)
    }

    message = async (userMessage: string) =>
    {
        if (!this.thread)
            return

        const message = await this.openai.beta.threads.messages.create(
            this.thread.id,
            {
                role: "user",
                content: userMessage
            }
        )

        //console.log("Message: ", message)
    }
}

const APIClient = new Api();
export default APIClient;
