// {"Date":"2025-05-20T18:30:00.000Z","Task":"Clean 1st floor","Category":"Other","Duration(Minute)":120,"Description":"-Book shelf cleaned"}

interface TaskData {
    Date: string;
    Task: string;
    Category: string;
    "Duration(Minute)": number;
    Description: string;
}

class Task {
    date: string;
    task: string;
    category: string;
    duration: number;
    description: string;
    constructor(
        date: string,
        task: string,
        category: string,
        duration: number,
        description: string
    ) {
        this.date = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        this.task = task;
        this.category = category;
        this.duration = duration;
        this.description = description;
    }
}

export { Task, type TaskData };