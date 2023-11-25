"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDownSquare, Trash2 } from "lucide-react";

import { Todo } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [label, setLabel] = useState("");

    useEffect(() => {
        (async () => {
            const todos = await axios.get<Todo[]>("/api/todos");
            setTodos(todos.data);
        })();
    }, []);

    async function createTodo() {
        const response = await axios.post("/api/todos", { label });
        setTodos(todos => {
            return [...todos, response.data];
        });
        setLabel("");
    }

    async function deleteTodo(id: string) {
        await axios.delete(`/api/todos/${id}`);
        setTodos(todos => {
            return todos.filter(todo => todo.id !== id);
        });
    }

    async function updateLabel(id: string) {
        const dummyLabel = "Dummy label";

        await axios.patch(`/api/todos/${id}`, { id, label: dummyLabel });
        setTodos(todos => {
            const newTodos = [];

            for (const todo of todos) {
                newTodos.push({
                    ...todo,
                    label: todo.id === id ? dummyLabel : todo.label,
                });
            }

            return newTodos;
        });
    }

    return (
        <main className={"container py-8"}>
            <h1 className={"text-3xl font-bold"}>Todo list</h1>

            <ul>
                {todos.length > 0 ? todos.map((todo, index) => (
                    <li key={todo.id} className={"flex gap-2 items-center"}>
                        <span>{index + 1}. {todo.label}</span>
                        <ArrowDownSquare/>
                        <Trash2 className={"cursor-pointer text-red-500"} onClick={() => deleteTodo(todo.id)}/>
                        <div onClick={() => updateLabel(todo.id)} className={"cursor-pointer"}>Dummy update</div>
                    </li>
                )) : <div>You have no todos</div>}
            </ul>

            <Separator className={"my-4"}/>

            <form className={"max-w-sm flex flex-col gap-2"}>
                <div className={"space-y-1"}>
                    <Label>Label</Label>
                    <Input value={label} onChange={(e) => setLabel(e.target.value)}/>
                </div>

                <Button className={"w-full"} type="button" onClick={createTodo} disabled={!label}>Create</Button>
            </form>
        </main>
    );
}
