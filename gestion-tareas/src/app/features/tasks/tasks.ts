import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task, CreateTask } from '../../core/interfaces/task.interface';
import { User } from '../../core/interfaces/user.interface';
import { TaskItemComponent } from '../../shared/components/task-item';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TaskItemComponent],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  editForm: FormGroup;
  showTaskForm = false;
  isCreating = false;
  isUpdating = false;
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  editingTask: Task | null = null;

  currentUser: User | null = null;
  allTasks$: Observable<Task[]>;
  activeTasks$: Observable<Task[]>;
  completedTasks$: Observable<Task[]>;
  currentTasks$: Observable<Task[]>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.taskForm = this.createTaskForm();
    this.editForm = this.createTaskForm();
    
    this.allTasks$ = this.taskService.getTasks();
    this.activeTasks$ = this.taskService.getActiveTasks();
    this.completedTasks$ = this.taskService.getCompletedTasks();
    this.currentTasks$ = this.allTasks$;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  private createTaskForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['medium'],
      dueDate: ['']
    });
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.currentFilter = filter;
    
    switch (filter) {
      case 'all':
        this.currentTasks$ = this.allTasks$;
        break;
      case 'active':
        this.currentTasks$ = this.activeTasks$;
        break;
      case 'completed':
        this.currentTasks$ = this.completedTasks$;
        break;
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isCreating = true;
      
      const taskData: CreateTask = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate ? new Date(this.taskForm.value.dueDate) : undefined
      };

      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.isCreating = false;
          this.resetForm();
          this.showTaskForm = false;
        },
        error: (error) => {
          this.isCreating = false;
          console.error('Error creating task:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  }

  onToggleComplete(taskId: string): void {
    this.taskService.toggleTaskCompletion(taskId).subscribe();
  }

  onEditTask(task: Task): void {
    this.editingTask = task;
    this.editForm.patchValue({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
    });
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.editingTask) {
      this.isUpdating = true;
      
      const updates = {
        ...this.editForm.value,
        dueDate: this.editForm.value.dueDate ? new Date(this.editForm.value.dueDate) : undefined
      };

      this.taskService.updateTask(this.editingTask.id, updates).subscribe({
        next: () => {
          this.isUpdating = false;
          this.cancelEdit();
        },
        error: (error) => {
          this.isUpdating = false;
          console.error('Error updating task:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.editForm.reset();
  }

  onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe();
  }

  onModalBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancelEdit();
    }
  }

  getEmptyStateMessage(): string {
    switch (this.currentFilter) {
      case 'active':
        return '¡Genial! No tienes tareas pendientes.';
      case 'completed':
        return 'Aún no has completado ninguna tarea.';
      default:
        return 'Comienza creando tu primera tarea.';
    }
  }
}