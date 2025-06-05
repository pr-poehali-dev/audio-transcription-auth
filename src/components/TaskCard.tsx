import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface TaskCardProps {
  task: Task;
  onDownload: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onDownload, onDelete }: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Готово";
      case "processing":
        return "Обработка";
      case "error":
        return "Ошибка";
      default:
        return "Ожидание";
    }
  };

  const getTypeText = (type: string) => {
    return type === "transcription" ? "Транскрибация" : "Саммаризация";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg truncate">{task.fileName}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{getTypeText(task.type)}</Badge>
            <Badge className={getStatusColor(task.status)}>
              {getStatusText(task.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              {task.createdAt.toLocaleDateString("ru-RU")}
            </div>
            {task.duration && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                {task.duration}
              </div>
            )}
          </div>

          {task.status === "processing" && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Прогресс</span>
                <span>{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {task.status === "completed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload(task.id)}
                className="flex items-center gap-1"
              >
                <Icon name="Download" size={16} />
                Скачать
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-800"
            >
              <Icon name="Trash2" size={16} />
              Удалить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
