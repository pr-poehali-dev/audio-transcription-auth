import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
}

const TaskFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
}: TaskFiltersProps) => {
  const statusOptions = [
    { value: "all", label: "Все статусы" },
    { value: "pending", label: "Ожидание" },
    { value: "processing", label: "Обработка" },
    { value: "completed", label: "Готово" },
    { value: "error", label: "Ошибка" },
  ];

  const typeOptions = [
    { value: "all", label: "Все типы" },
    { value: "transcription", label: "Транскрибация" },
    { value: "summarization", label: "Саммаризация" },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Icon
          name="Search"
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
          placeholder="Поиск по названию файла..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Статус:</span>
          <div className="flex gap-1">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={statusFilter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusFilterChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Тип:</span>
          <div className="flex gap-1">
            {typeOptions.map((option) => (
              <Button
                key={option.value}
                variant={typeFilter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeFilterChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
