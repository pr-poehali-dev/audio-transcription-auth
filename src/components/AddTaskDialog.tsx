import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface AddTaskDialogProps {
  onAddTask: (file: File, type: "transcription" | "summarization") => void;
}

const AddTaskDialog = ({ onAddTask }: AddTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [taskType, setTaskType] = useState<"transcription" | "summarization">(
    "transcription",
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onAddTask(selectedFile, taskType);
      setSelectedFile(null);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Icon name="Plus" size={18} />
          Добавить задание
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить новое задание</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Аудиофайл</Label>
            <Input
              id="file"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Выбран файл: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Тип обработки</Label>
            <div className="flex gap-2">
              <Button
                variant={taskType === "transcription" ? "default" : "outline"}
                size="sm"
                onClick={() => setTaskType("transcription")}
              >
                Транскрибация
              </Button>
              <Button
                variant={taskType === "summarization" ? "default" : "outline"}
                size="sm"
                onClick={() => setTaskType("summarization")}
              >
                Саммаризация
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedFile}>
              Создать задание
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
