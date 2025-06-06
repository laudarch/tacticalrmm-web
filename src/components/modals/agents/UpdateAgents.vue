<template>
  <q-card>
    <q-bar>
      Update Agents
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-separator />
    <q-banner class="bg-primary">
      <template v-slot:avatar>
        <q-icon name="info" />
      </template>
      If agent auto update is enabled in Global Settings, agents will
      automatically self update at 35 min past the hour, every hour. Use this
      tool to manually trigger an agent update cycle.
    </q-banner>
    <q-card-section>
      Select Version
      <q-select
        square
        disable
        dense
        options-dense
        outlined
        v-model="version"
        :options="versions"
      />
    </q-card-section>
    <q-card-section v-show="version !== null">
      Select Agent
      <br />
      <q-separator />
      <q-checkbox
        v-model="selectAll"
        label="Select All"
        @update:model-value="selectAllAction"
      />
      <q-btn
        v-show="group.length !== 0"
        label="Update"
        color="primary"
        @click="update"
        class="q-ml-xl"
      />
      <q-separator />
      <q-option-group
        v-model="group"
        :options="agentOptions"
        color="green"
        type="checkbox"
        style="max-height: 60vh; max-width: 40vw"
        class="scroll"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  name: "UpdateAgents",
  emits: ["close"],
  mixins: [mixins],
  data() {
    return {
      versions: [],
      version: null,
      agents: [],
      group: [],
      selectAll: false,
    };
  },
  methods: {
    selectAllAction() {
      this.selectAll ? (this.group = this.agentIds) : (this.group = []);
    },
    getVersions() {
      this.$q.loading.show();
      this.$axios
        .get("/agents/versions/")
        .then((r) => {
          this.versions = r.data.versions;
          this.version = r.data.versions[0];
          this.agents = r.data.agents;
          this.$q.loading.hide();
        })
        .catch(() => {
          this.$q.loading.hide();
        });
    },
    update() {
      const data = { agent_ids: this.group };
      this.$axios.post("/agents/update/", data).then(() => {
        this.$emit("close");
        this.notifySuccess("Agents will now be updated");
      });
    },
  },
  computed: {
    agentIds() {
      return this.agents.map((k) => k.agent_id);
    },
    agentOptions() {
      const options = [];
      for (let i of Object.values(this.agents)) {
        let opt = {};
        opt["label"] = `${i.hostname} (${i.client} > ${i.site})`;
        opt["value"] = i.agent_id;
        options.push(opt);
      }
      return options.sort((a, b) => a.label.localeCompare(b.label));
    },
  },
  mounted() {
    this.getVersions();
  },
};
</script>
