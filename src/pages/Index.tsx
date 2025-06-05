import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import AddTaskDialog from "@/components/AddTaskDialog";
import TaskFilters from "@/components/TaskFilters";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Task {
  id: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "error";
  type: "transcription" | "summarization";
  createdAt: Date;
  progress: number;
  duration?: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      fileName: "интервью_01.mp3",
      status: "completed",
      type: "transcription",
      createdAt: new Date("2024-01-15"),
      progress: 100,
      duration: "15:30",
    },
    {
      id: "2",
      fileName: "лекция_философия.wav",
      status: "processing",
      type: "summarization",
      createdAt: new Date("2024-01-16"),
      progress: 65,
      duration: "45:20",
    },
    {
      id: "3",
      fileName: "подкаст_технологии.mp3",
      status: "pending",
      type: "transcription",
      createdAt: new Date("2024-01-17"),
      progress: 0,
      duration: "32:15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.fileName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddTask = (
    file: File,
    type: "transcription" | "summarization",
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      fileName: file.name,
      status: "pending",
      type,
      createdAt: new Date(),
      progress: 0,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDownload = (taskId: string) => {
    console.log("Скачивание задания:", taskId);
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Аудио Транскрибация
            </h1>
            <p className="text-gray-600 mt-2">
              Управление заданиями транскрибации и саммаризации
            </p>
          </div>
          <AddTaskDialog onAddTask={handleAddTask} />
        </div>

        <div className="mb-6">
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Найдено заданий: {filteredTasks.length}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} />
            Обновить
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              name="FileAudio"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Заданий не найдено
            </h3>
            <p className="text-gray-600 mb-4">
              {tasks.length === 0
                ? "Добавьте первое задание для транскрибации или саммаризации"
                : "Попробуйте изменить фильтры поиска"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
