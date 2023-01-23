<template>
    <div class="input-group mb-3">
        <input
            type="text"
            class="form-control"
            placeholder="Search By Todo"
            v-model="search"
            required
        />
        <!-- <button
            class="btn btn-primary"
            type="button"
            id="button-addon2"
            @click="searchTodo()"
        >
            Search
        </button> -->
    </div>
    <div class="card">
        <div class="card-body">
            <div class="input-group mb-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Add Todo"
                    v-model="todoInput"
                    required
                />
                <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    @click="saveTodo()"
                    v-if="!editid"
                >
                    Add
                </button>
                <button
                    class="btn btn-info"
                    type="button"
                    id="button-addon2"
                    @click="updateTodo()"
                    v-else
                >
                    Update
                </button>
                <button
                    class="btn btn-danger"
                    type="button"
                    @click="resetTodo()"
                >
                    Reset
                </button>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Todo</th>
                        <th>Created At</th>
                        <th>Time Duration</th>
                        <th>Time Devoted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(todo, index) in todos.data" :key="todo.id">
                        <td>{{ todo.id }}</td>
                        <td>{{ todo.todo }}</td>
                        <td>
                            {{
                                moment(todo.created_at).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )
                            }}
                        </td>
                        <td>
                            {{
                                elapsedTime[todo.id]
                                    ? elapsedTime[todo.id].hours
                                          .toString()
                                          .padStart(2, "0")
                                    : "00"
                            }}:{{
                                elapsedTime[todo.id]
                                    ? elapsedTime[todo.id].minutes
                                          .toString()
                                          .padStart(2, "0")
                                    : "00"
                            }}:{{
                                elapsedTime[todo.id]
                                    ? elapsedTime[todo.id].seconds
                                          .toString()
                                          .padStart(2, "0")
                                    : "00"
                            }}
                        </td>
                        <td>
                            {{
                                timeData[todo.id]
                                    ? timeData[todo.id]
                                          .map((time) => time.time)
                                          .join("\n")
                                    : "00:00:00"
                            }}
                        </td>
                        <td class="d-flex">
                            <button
                                @click="startTimer(todo.id)"
                                class="btn btn-primary"
                            >
                                Start timer
                            </button>
                            <button
                                @click="pauseTimer(todo.id)"
                                class="btn btn-warning ms-2"
                            >
                                Pause timer
                            </button>
                            <button
                                @click="saveTime(todo.id)"
                                class="btn btn-success ms-2"
                            >
                                Save
                            </button>
                            <button
                                class="btn btn-info ms-2"
                                @click="editTodo(--index)"
                            >
                                Edit
                            </button>
                            <button
                                class="btn btn-danger ms-2"
                                @click="deleteTodo(--index)"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Bootstrap5Pagination
        align="center"
        :data="todos"
        @pagination-change-page="todosData"
    />
</template>
<script>
import moment from "moment";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

export default {
    name: "Todo",
    components: { Bootstrap5Pagination },
    data() {
        return {
            moment: moment,
            todos: [],
            todoInput: "",
            editid: "",
            editIndex: "",
            timer: {},
            elapsedTime: {},
            timeData: {},
            search: null,
        };
    },
    watch: {
        search(after, before) {
            // alert("Watch");
            this.searchTodo();
            this.todosData();
        },
    },
    mounted() {
        this.todosData();
    },
    methods: {
        async searchTodo() {
            const { data } = await this.axios.get(
                `/todos?search=${this.search}`
            );
            console.log(data);
            this.todos = data;

            // Retrieve the elapsed time from local storage for each todo
            this.todos.data.forEach((todo) => {
                this.fetchTimeData(todo.id);

                const elapsedTime = localStorage.getItem(
                    `todo-${todo.id}-time`
                );

                if (elapsedTime) {
                    this.elapsedTime[todo.id] = JSON.parse(elapsedTime);
                } else {
                    this.elapsedTime[todo.id] = {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    };
                }
            });
        },
        todosData(page = 1) {
            this.axios
                .get(`/todos?page=${page}`)
                .then(({ data }) => {
                    this.todos = data;

                    // Retrieve the elapsed time from local storage for each todo
                    this.todos.data.forEach((todo) => {
                        // debugger;
                        this.fetchTimeData(todo.id);

                        const elapsedTime = localStorage.getItem(
                            `todo-${todo.id}-time`
                        );

                        if (elapsedTime) {
                            this.elapsedTime[todo.id] = JSON.parse(elapsedTime);
                        } else {
                            this.elapsedTime[todo.id] = {
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                            };
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        async fetchTimeData(todoId) {
            const { data } = await this.axios.get(`/todo/${todoId}/time`);
            if (Array.isArray(data) && data.length === 0) {
                return "00:00:00";
            } else {
                this.timeData[todoId] = data;
            }
        },
        // SAVE TODO IN DATABASE
        saveTodo() {
            if (this.todoInput === "") {
                alert("Required all fields");
            }
            if (this.todoInput.length > 0) {
                let formData = { todo: this.todoInput };
                this.axios.post("/todos", formData).then((response) => {
                    this.todos.push(response.data);
                    alert("Todo added successfully");
                    this.todoInput = "";
                });
            }
        },
        editTodo(index) {
            if (this.todos[index].id) {
                this.todoInput = this.todos[index].todo;
                this.editid = this.todos[index].id;
                this.editIndex = index;
            }
        },
        updateTodo() {
            if (this.todoInput.length > 0) {
                // console.log(this.todo);
                let formData = { todo: this.todoInput };
                this.axios
                    .put(
                        "/todos" + "/" + this.todos[this.editIndex].id,
                        formData
                    )
                    .then(({ data }) => {
                        this.todos[this.editIndex].todo = data.todo;
                        alert("Todo updated successfully");
                        this.resetTodo();
                    });
            }
        },
        deleteTodo(index) {
            confirm("Do You want to delete todo");
            if (this.todos[index].id) {
                this.axios
                    .delete("/todos" + "/" + this.todos[index].id)
                    .then((response) => {
                        this.todos.splice(index, 1);
                    });
            }
        },
        resetTodo() {
            this.todoInput = "";
            this.editid = "";
            this.editIndex = "";
        },
        startTimer(id) {
            // // Check if the elapsed time is saved in local storage
            const elapsedTime = localStorage.getItem(`todo-${id}-time`);
            if (elapsedTime) {
                // Retrieve the elapsed time from local storage
                this.elapsedTime[id] = JSON.parse(elapsedTime);
            } else {
                // // Initialize the elapsed time
                this.elapsedTime[id] = {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                };
            }

            // Start the timer
            this.timer[id] = setInterval(() => {
                this.elapsedTime[id].seconds++;

                if (this.elapsedTime[id].seconds >= 60) {
                    this.elapsedTime[id].minutes++;
                    this.elapsedTime[id].seconds = 0;
                }

                if (this.elapsedTime[id].minutes >= 60) {
                    this.elapsedTime[id].hours++;
                    this.elapsedTime[id].minutes = 0;
                }

                // Save the elapsed time in local storage
                localStorage.setItem(
                    `todo-${id}-time`,
                    JSON.stringify(this.elapsedTime[id])
                );
            }, 1000);
        },
        pauseTimer(id) {
            // Clear the timer
            clearInterval(this.timer[id]);

            // Save the elapsed time in local storage
            localStorage.setItem(
                `todo-${id}-time`,
                JSON.stringify(this.elapsedTime[id])
            );
        },
        saveTime(id) {
            const timeString = `${this.elapsedTime[id].hours
                .toString()
                .padStart(2, "0")}:${this.elapsedTime[id].minutes
                .toString()
                .padStart(2, "0")}:${this.elapsedTime[id].seconds
                .toString()
                .padStart(2, "0")}`;
            this.axios
                .post(`/todo/time`, {
                    time: timeString,
                    todo_id: id,
                })
                .then((response) => {
                    // The elapsed time has been saved to the database
                    console.log("Elapsed time saved to the database");
                    alert("Time saved to the database");
                })
                .catch((error) => {
                    // An error occurred while saving the elapsed time
                    console.error(error);
                });
        },
    },
};
</script>
<style>
.pagination {
    margin-top: 50px;
}
</style>
