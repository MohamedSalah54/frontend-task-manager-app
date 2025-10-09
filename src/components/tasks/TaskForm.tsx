"use client";
import React from "react";
import { TaskFormProps } from "@/interfaces/taskForm";

const TaskForm: React.FC<TaskFormProps> = ({
  taskData,
  isEditing = false,
  onChange,
  onCancel,
  onSubmit,
  options,
}) => {
    const handleCategoryClick = (cat: string) => {
    const normalized = cat.toLowerCase();
    console.log("🟪 [UI] Category clicked:", normalized);
    console.log("🟩 [FORM] taskData before change:", taskData);

    // نحدّث الـ category داخل الفورم
    onChange("category", normalized);

    // نستخدم setTimeout عشان نتحقق من التحديث في الدورة الجاية
    setTimeout(() => {
      console.log("🟨 [FORM] taskData after change (check state update):", taskData);
    }, 100);
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isEditing ? "Edit Task" : "Add New Task"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={taskData.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) => {
                const value = e.target.value;

                const year = value.split("-")[0];
                if (year && year.length > 4) return;

                onChange("dueDate", value);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              pattern="\d{4}-\d{2}-\d{2}"
              title="Date must be in the format YYYY-MM-DD"
            />
          </div>
{/* <div>
  <label className="block text-sm font-medium text-gray-700">
    Category
  </label>
  <div className="flex flex-wrap gap-2">
{options.map((cat) => (
  <button
    key={cat.name}
    type="button"
    onClick={() => {
      const selected = cat.name.toLowerCase();
      console.log("🟦 Selected Category Clicked:", selected);
      console.log("🟩 taskData before change:", taskData);
      onChange("category", selected);
      setTimeout(() => {
        console.log("🟨 taskData after change (check state update):", taskData);
      }, 100);
    }}
    className={`flex items-center justify-center flex-1 p-2 border rounded-md transition-all
      ${
        taskData.category === cat.name.toLowerCase()
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
  >
    <span className="mr-2 text-lg">{cat.icon}</span>
    {cat.name}
  </button>
))}

  </div>
</div> */}
 <div>
      <label className="block text-sm font-medium text-gray-700">
        Category
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => handleCategoryClick(cat.name)} // ← هنا استخدمناها
            className={`flex items-center justify-center flex-1 p-2 border rounded-md transition-all ${
              taskData.category === cat.name.toLowerCase()
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2 text-lg">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>


          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onCancel}
              className="text-gray-600 bg-gray-200 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isEditing ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
