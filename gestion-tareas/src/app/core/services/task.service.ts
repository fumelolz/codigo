import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Task, CreateTask, UpdateTask } from '../interfaces/task.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private storageKey = 'tasks_data';

  constructor(private authService: AuthService) {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
      this.tasksSubject.next(tasks);
    } else {
      // Load some demo tasks
      this.loadDemoTasks();
    }
  }

  private loadDemoTasks(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const demoTasks: Task[] = [
      {
        id: '1',
        title: 'Completar proyecto Angular',
        description: 'Finalizar la aplicación de gestión de tareas',
        completed: false,
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: currentUser.id
      },
      {
        id: '2',
        title: 'Revisar documentación',
        description: 'Leer la documentación de Angular Forms',
        completed: true,
        priority: 'medium',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(),
        userId: currentUser.id
      },
      {
        id: '3',
        title: 'Preparar presentación',
        description: 'Crear slides para demostrar la aplicación',
        completed: false,
        priority: 'low',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: currentUser.id
      }
    ];

    this.tasksSubject.next(demoTasks);
    this.saveTasks(demoTasks);
  }

  getTasks(): Observable<Task[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return of([]);
    }

    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.userId === currentUser.id))
    );
  }

  getActiveTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => !task.completed))
    );
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => task.completed))
    );
  }

  createTask(taskData: CreateTask): Observable<Task> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: currentUser.id
    };

    return of(newTask).pipe(
      delay(500),
      map(task => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = [...currentTasks, task];
        this.tasksSubject.next(updatedTasks);
        this.saveTasks(updatedTasks);
        return task;
      })
    );
  }

  updateTask(taskId: string, updates: UpdateTask): Observable<Task> {
    return of(null).pipe(
      delay(300),
      map(() => {
        const currentTasks = this.tasksSubject.value;
        const taskIndex = currentTasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
          throw new Error('Task not found');
        }

        const updatedTask = {
          ...currentTasks[taskIndex],
          ...updates,
          updatedAt: new Date()
        };

        const updatedTasks = [...currentTasks];
        updatedTasks[taskIndex] = updatedTask;
        
        this.tasksSubject.next(updatedTasks);
        this.saveTasks(updatedTasks);
        return updatedTask;
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return of(null).pipe(
      delay(300),
      map(() => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.filter(task => task.id !== taskId);
        this.tasksSubject.next(updatedTasks);
        this.saveTasks(updatedTasks);
      })
    );
  }

  toggleTaskCompletion(taskId: string): Observable<Task> {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find(t => t.id === taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }

    return this.updateTask(taskId, { completed: !task.completed });
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}