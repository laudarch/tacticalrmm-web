<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="min-width: 75vw; max-heigth: 75vh" class="q-dialog-plugin">
      <q-bar>
        {{ localRole ? "Editing Role" : "Adding Role" }}
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-form ref="form" @submit="onSubmit">
        <q-card-section class="row">
          <q-input
            label="Role Name"
            class="col-6"
            dense
            outlined
            v-model="localRole.name"
            :rules="[(val) => !!val || '*Required']"
          />
        </q-card-section>
        <q-card-section class="scroll" style="height: 70vh">
          <!-- Permissions -->
          <div class="text-subtitle2">Super User</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox v-model="localRole.is_superuser" label="Super User" />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Reporting</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_view_reports"
                label="Reporting Viewer"
              />
              <q-checkbox
                v-model="localRole.can_manage_reports"
                label="Reporting Manager"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Accounts</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_accounts"
                label="List User Accounts"
              />
              <q-checkbox
                v-model="localRole.can_manage_accounts"
                label="Manage User Accounts"
              />
              <q-checkbox
                v-model="localRole.can_list_roles"
                label="List Roles"
              />
              <q-checkbox
                v-model="localRole.can_manage_roles"
                label="Manage Roles"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Agents</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_agents"
                label="List Agents"
              />
              <q-checkbox
                v-model="localRole.can_list_agent_history"
                label="List Agent History"
              />
              <q-checkbox
                v-model="localRole.can_use_mesh"
                label="Use MeshCentral"
              />
              <q-checkbox
                v-model="localRole.can_uninstall_agents"
                label="Uninstall Agents"
              />
              <q-checkbox
                v-model="localRole.can_update_agents"
                label="Update Agents"
              />
              <q-checkbox
                v-model="localRole.can_edit_agent"
                label="Edit Agents"
              />
              <q-checkbox
                v-model="localRole.can_manage_procs"
                label="Manage Processes"
              />
              <q-checkbox
                v-model="localRole.can_view_eventlogs"
                label="View Event Logs"
              />
              <q-checkbox
                v-model="localRole.can_send_cmd"
                label="Send Command"
              />
              <q-checkbox
                v-model="localRole.can_reboot_agents"
                label="Shutdown / Reboot Agents"
              />
              <q-checkbox
                v-model="localRole.can_send_wol"
                label="Wake-Up (WoL) Agents"
              />
              <q-checkbox
                v-model="localRole.can_install_agents"
                label="Install Agents"
              />
              <q-checkbox
                v-model="localRole.can_run_scripts"
                label="Run Script"
              />
              <q-checkbox
                v-model="localRole.can_run_bulk"
                label="Bulk Actions"
              />
              <q-checkbox
                v-model="localRole.can_recover_agents"
                label="Recover Agents"
              />
            </div>
          </q-card-section>
          <div class="text-subtitle2">Core</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_notes"
                label="List Notes"
              />
              <q-checkbox
                v-model="localRole.can_manage_notes"
                label="Manage Notes"
              />
              <q-checkbox
                v-model="localRole.can_view_core_settings"
                label="View Global Settings"
              />
              <q-checkbox
                v-model="localRole.can_edit_core_settings"
                label="Edit Global Settings"
              />
              <q-checkbox
                v-model="localRole.can_view_global_keystore"
                label="View Global Key Store"
              />
              <q-checkbox
                v-model="localRole.can_edit_global_keystore"
                label="Edit Global Key Store"
              />
              <q-checkbox
                v-model="localRole.can_do_server_maint"
                label="Do Server Maintenance"
              />
              <q-checkbox
                v-model="localRole.can_code_sign"
                label="Manage Code Signing"
              />
              <q-checkbox
                v-model="localRole.can_list_api_keys"
                label="List API Keys"
              />
              <q-checkbox
                v-model="localRole.can_manage_api_keys"
                label="Manage API Keys"
              />
              <q-checkbox
                v-model="localRole.can_run_urlactions"
                label="Run URL Actions"
              />
              <q-checkbox
                v-model="localRole.can_view_customfields"
                label="View Custom Fields"
              />
              <q-checkbox
                v-model="localRole.can_manage_customfields"
                label="Edit Custom Fields"
              />
              <q-checkbox
                v-if="!hosted"
                v-model="localRole.can_use_webterm"
                label="Use TRMM Server Web Terminal"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Checks</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_checks"
                label="List Checks"
              />
              <q-checkbox
                v-model="localRole.can_manage_checks"
                label="Manage Checks"
              />
              <q-checkbox
                v-model="localRole.can_run_checks"
                label="Run Checks"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Clients</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_clients"
                label="List Clients"
              />
              <q-checkbox
                v-model="localRole.can_manage_clients"
                label="Manage Clients"
              />
              <q-checkbox
                v-model="localRole.can_list_sites"
                label="List Sites"
              />
              <q-checkbox
                v-model="localRole.can_manage_sites"
                label="Manage Sites"
              />
              <q-checkbox
                v-model="localRole.can_list_deployments"
                label="List Deployments"
              />
              <q-checkbox
                v-model="localRole.can_manage_deployments"
                label="Manage Deployments"
              />
            </div>
          </q-card-section>

          <q-card-section class="row">
            <tactical-dropdown
              class="col-6"
              label="Allowed Clients"
              :options="clientOptions"
              v-model="localRole.can_view_clients"
              hint="Empty means all clients are allowed"
              outlined
              mapOptions
              multiple
              filterable
            />
          </q-card-section>
          <q-card-section class="row">
            <tactical-dropdown
              class="col-6"
              label="Allowed Sites"
              :options="siteOptions"
              v-model="localRole.can_view_sites"
              hint="Empty means all sites are allowed"
              outlined
              mapOptions
              multiple
              filterable
            />
          </q-card-section>

          <div class="text-subtitle2">Automation Policies</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_automation_policies"
                label="List Automation Policies"
              />
              <q-checkbox
                v-model="localRole.can_manage_automation_policies"
                label="Manage Automation Policies"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Tasks</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_autotasks"
                label="List Tasks"
              />
              <q-checkbox
                v-model="localRole.can_manage_autotasks"
                label="Manage Tasks"
              />
              <q-checkbox
                v-model="localRole.can_run_autotasks"
                label="Run Tasks"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Logs</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_view_auditlogs"
                label="View Audit Logs"
              />
              <q-checkbox
                v-model="localRole.can_view_debuglogs"
                label="View Debug Logs"
              />
              <q-checkbox
                v-model="localRole.can_list_pendingactions"
                label="List Pending Actions"
              />
              <q-checkbox
                v-model="localRole.can_manage_pendingactions"
                label="Manage Pending Actions"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Scripts</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_scripts"
                label="List Scripts"
              />
              <q-checkbox
                v-model="localRole.can_manage_scripts"
                label="Manage Scripts"
              />
              <q-checkbox
                v-if="!hosted"
                v-model="localRole.can_run_server_scripts"
                label="Run Scripts on TRMM Server"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Alerts</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_alerts"
                label="List Alerts"
              />
              <q-checkbox
                v-model="localRole.can_manage_alerts"
                label="Manage Alerts"
              />
              <q-checkbox
                v-model="localRole.can_list_alerttemplates"
                label="List Alert Templates"
              />
              <q-checkbox
                v-model="localRole.can_manage_alerttemplates"
                label="Manage Alert Templates"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Windows Services</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_manage_winsvcs"
                label="Manage Windows Services"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Software</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_list_software"
                label="List Software"
              />
              <q-checkbox
                v-model="localRole.can_manage_software"
                label="Manage Software"
              />
            </div>
          </q-card-section>

          <div class="text-subtitle2">Windows Updates</div>
          <q-separator />
          <q-card-section class="row">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="localRole.can_manage_winupdates"
                label="Manage Windows Updates"
              />
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense flat label="Cancel" v-close-popup />
          <q-btn
            :loading="loading"
            dense
            flat
            label="Save"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
// composition imports
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useDialogPluginComponent } from "quasar";
import { saveRole, editRole } from "@/api/accounts";
import { useClientDropdown, useSiteDropdown } from "@/composables/clients";
import { notifySuccess } from "@/utils/notify";

// ui imports
import TacticalDropdown from "@/components/ui/TacticalDropdown.vue";

export default {
  components: { TacticalDropdown },
  name: "RolesForm",
  emits: [...useDialogPluginComponent.emits],
  props: { role: Object },
  setup(props) {
    // quasar setup
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

    // store
    const store = useStore();
    const hosted = computed(() => store.state.hosted);

    // dropdown setup
    const { clientOptions } = useClientDropdown(true);
    const { siteOptions } = useSiteDropdown(true);

    const role = props.role
      ? ref(Object.assign({}, props.role))
      : ref({
          name: "",
          is_superuser: false,
          // agent perms
          can_list_agents: false,
          can_recover_agents: false,
          can_use_mesh: false,
          can_uninstall_agents: false,
          can_update_agents: false,
          can_edit_agent: false,
          can_manage_procs: false,
          can_view_eventlogs: false,
          can_send_cmd: false,
          can_reboot_agents: false,
          can_install_agents: false,
          can_run_scripts: false,
          can_run_bulk: false,
          can_manage_winsvcs: false,
          can_list_agent_history: false,
          can_send_wol: false,
          // software perms
          can_list_software: false,
          can_manage_software: false,
          // note perms
          can_list_notes: false,
          can_manage_notes: false,
          // settings perms
          can_view_core_settings: false,
          can_edit_core_settings: false,
          can_view_global_keystore: false,
          can_edit_global_keystore: false,
          can_do_server_maint: false,
          can_code_sign: false,
          can_run_urlactions: false,
          can_view_customfields: false,
          can_manage_customfields: false,
          // api key perms
          can_list_api_keys: false,
          can_manage_api_keys: false,
          // check perms
          can_list_checks: false,
          can_manage_checks: false,
          can_run_checks: false,
          // client perms
          can_list_clients: false,
          can_manage_clients: false,
          can_list_sites: false,
          can_manage_sites: false,
          // deployment perms
          can_list_deployments: false,
          can_manage_deployments: false,
          // automation perms
          can_list_automation_policies: false,
          can_manage_automation_policies: false,
          // task perms
          can_list_autotasks: false,
          can_manage_autotasks: false,
          can_run_autotasks: false,
          // log perms
          can_view_auditlogs: false,
          can_view_debuglogs: false,
          can_list_pendingactions: false,
          can_manage_pendingactions: false,
          // script perms
          can_list_scripts: false,
          can_manage_scripts: false,
          // alert perms
          can_list_alerts: false,
          can_manage_alerts: false,
          can_list_alerttemplates: false,
          can_manage_alerttemplates: false,
          // update perms
          can_manage_winupdates: false,
          // account perms
          can_list_accounts: false,
          can_manage_accounts: false,
          can_list_roles: false,
          can_manage_roles: false,
          can_view_clients: [],
          can_view_sites: [],
          // server scripts and web terminal
          can_run_server_scripts: false,
          can_use_webterm: false,
          // reporting perms
          can_view_reports: false,
          can_manage_reports: false,
        });

    const loading = ref(false);

    async function onSubmit() {
      loading.value = true;
      try {
        const result = props.role
          ? await editRole(role.value.id, role.value)
          : await saveRole(role.value);
        notifySuccess(result);
        onDialogOK();
      } catch (e) {
        console.error(e);
      }
      loading.value = false;
    }

    watch(
      () => role.value.is_superuser,
      (newValue) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.keys(role.value).forEach((key, index) => {
          if (typeof role.value[key] === "boolean") {
            role.value[key] = newValue;
          }
        });
      },
    );

    return {
      // reactive data
      localRole: role,
      loading,
      clientOptions,
      siteOptions,
      hosted,

      onSubmit,

      // quasar dialog
      dialogRef,
      onDialogHide,
    };
  },
};
</script>
