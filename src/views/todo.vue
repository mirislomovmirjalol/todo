<template>
  <div>
    <v-text-field
        v-model="newTask"
        outlined
        label="new To Do"
        append-outer-icon="mdi-plus"
        hint="Write new to do for example 'get up'"
        clearable
        hide-details
        color="indigo"
        @click:append-outer="addTask()"
    >

    </v-text-field>
    <v-list
        flat
        class="pt-2"
    >
      <div v-if="tasks[0]">
        <v-fade-transition
            group
        >
          <div v-for="task in tasks.slice().reverse()" :key="task.id">
            <v-list-item
                :dark="task.done === true || task.done === 1"
                :class="{ 'indigo' : task.done }"
                class="rounded mt-1"
            >
              <template>
                <v-list-item-action>
                  <v-checkbox
                      @click="updateTask(task.id)"
                      :input-value="task.done"
                      color="indigo lighten-5"
                  >
                  </v-checkbox>
                </v-list-item-action>

                <v-list-item-content
                    class="row-pointer"
                    @click="modal(task.id)"
                >
                  <v-list-item-title>
                    {{ task.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                    @click="deleteTask(task.id)"
                >
                  <v-btn icon>
                    <v-icon
                        color="red">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-fade-transition>
      </div>

      <div v-else>
        <v-subheader>
          You don't have any todo
        </v-subheader>
      </div>

    </v-list>

    <!--   Pop Up   -->

    <v-row v-if="modalEdit" justify="center">
      <v-dialog
          v-model="sheet"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
              dark
              color="indigo"
          >
            <v-btn
                icon
                dark
                v-on:click="() => { this.sheet= false; this.modalEdit.permission= false }"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  icon
                  dark
                  @click="modalEdit.permission = !modalEdit.permission"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                  dark
                  text
                  @click="editTask(modalEdit.id)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-list
              three-line
              subheader
          >
            <v-subheader>To Do Done?</v-subheader>
            <v-list-item>
              <v-checkbox
                  v-bind:disabled="modalEdit.permission === false "
                  v-model="modalEdit.done"
                  color="indigo"
              >

              </v-checkbox>
              <v-list-item-title>
                Done
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list
              three-line
              subheader
              v-if="modalEdit.permission === false"
          >
            <v-subheader>To Do title</v-subheader>
            <v-container>
              <v-card-text>
                {{ this.modalEdit.title }}
              </v-card-text>
            </v-container>
          </v-list>
          <v-list
              three-line
              subheader
              v-else
          >
            <v-subheader>To Do title</v-subheader>
            <v-container>
              <v-textarea
                  counter
                  label="To Do title"
                  v-model="modalEdit.title"
              ></v-textarea>
            </v-container>
          </v-list>
          <v-divider></v-divider>
          <v-list
              three-line
              subheader
          >
            <v-subheader>Data</v-subheader>
            <v-container>
              <v-subheader>
                <h3>
                  {{ this.modalEdit.data }}
                </h3>
              </v-subheader>
            </v-container>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>

<script>

export default {
  name: "todo.vue",
  data: () => ({
    newTask: '',
    sheet: false,
    modalEdit: {
      permission: false,
      id: '',
      title: '',
      done: '',
      data: '',
    },
  }),
  methods: {
    modal(id) {
      let sheet = this.sheet
      let data = this.tasks.filter(task => task.id === id)[0];
      this.modalEdit.id = data.id;
      this.modalEdit.title = data.title;
      this.modalEdit.done = data.done;
      this.modalEdit.data = data.data;
      this.sheet = !sheet
    },
    updateTask(id) {
      let task = this.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
      this.$store.dispatch('updateTodo', task)
    },
    editTask() {
      let task = {};
      task.id = this.modalEdit.id;
      task.title = this.modalEdit.title;
      task.done = this.modalEdit.done;
      this.$store.dispatch('updateTodo', task);
      this.modalEdit.permission = false;
      this.sheet = false;
    },
    deleteTask(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    addTask() {
      if (this.newTask.trim().length === 0) {
        return
      }

      let newTask = {
        id: Date.now(),
        title: this.newTask,
        done: false
      }
      this.$store.dispatch('addTodo', newTask)
      this.newTask = null
    },
  },
  computed: {
    tasks: function () {
      return this.$store.getters.todos
    }
  },
  mounted() {
    this.$store.dispatch('retrieveTodos');
  },


}
</script>

<style scoped>

</style>