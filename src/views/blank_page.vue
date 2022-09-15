<template>
    <teleport to="#breadcrumb">
        <ul class="navbar-nav flex-row">
            <li>
                <div class="page-header">
                    <nav class="breadcrumb-one" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active" aria-current="page"><span>Blank Page</span></li>
                        </ol>
                    </nav>
                </div>
            </li>
        </ul>
    </teleport>
    <div class="layout-px-spacing">        

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
                <div class="panel br-4">
                    <div class="panel-body">
                        <h6>Kick Start you new project with ease!</h6>
                        <div>
                            <a id="addCountry" href="javascript:;" @click="edit_country()" class="btn me-2 btn-primary"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-plus"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                                Add New
                            </a>
                        </div>
                        <!--Modal-->
                        <div id="addTaskModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-md modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Add Task</h5>
                                        <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="compose-box">
                                            <div class="compose-content">
                                                <form>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group mb-4">
                                                                <label>Title</label>
                                                                <div class="w-100">
                                                                    <input type="text" class="form-control" placeholder="Title" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Description</label>
                                                                <div class="w-100">
                                                                    <input type="text" class="form-control" placeholder="Title" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">Discard</button>
                                        <button type="button" class="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .layout-px-spacing {
        min-height: calc(100vh - 170px) !important;
    }
</style>

<script setup>
    import {onMounted, ref} from 'vue';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Blank Page' });
    let addTaskModal = ref(null);

    onMounted(() => {
        initPopup();
    })

    const initPopup = () => {
        addTaskModal = new window.bootstrap.Modal(document.getElementById('addTaskModal'));
    };

    const edit_country = () => {        
        addTaskModal.show();
    };
</script>
