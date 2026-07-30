"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { CreateProjectForm } from "./create-project-form";

export function CreateProjectButton() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={<Button variant="outline" />}>
                <Button>
                    Create Project
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>
                </DialogHeader>

                <CreateProjectForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}