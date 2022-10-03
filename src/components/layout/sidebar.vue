<template>
    <!--  BEGIN SIDEBAR  -->
    <div class="sidebar-wrapper sidebar-theme">
        <nav ref="menu" id="sidebar">
            <div class="shadow-bottom"></div>

            <perfect-scrollbar class="list-unstyled menu-categories" tag="ul" :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                <!-- Dashboard menu start-->
                <li class="menu">
                    <router-link to="/dashboard" class="dropdown-toggle" @click="toggleMobileMenu">
                        <div class="">
                            <i data-feather="home"></i>                            
                            <span>{{ $t('dashboard') }}</span>
                        </div>
                    </router-link>
                </li>
                <!-- End-->

                <!-- User Manage menu start-->
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#role-manage" aria-controls="role-manage" aria-expanded="false">
                        <div class="">
                            <i data-feather="user-x"></i>
                            <span>{{ $t('role_manage') }}</span>
                        </div>
                        <div>
                            <i data-feather="chevron-right"></i>
                        </div>
                    </a>

                    <ul id="role-manage" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li>
                            <router-link to="/roles" @click="toggleMobileMenu">
                                {{$t('all_roles')}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <!-- End -->
                <!-- User Manage menu start-->
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#user-manage" aria-controls="user-manage" aria-expanded="false">
                        <div class="">
                            <i data-feather="users"></i>                            
                            <span>{{ $t('user_manage') }}</span>
                        </div>
                        <div>
                            <i data-feather="chevron-right"></i>
                        </div>
                    </a>

                    <ul id="user-manage" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li>
                            <router-link to="/users" @click="toggleMobileMenu">
                                {{$t('all_user')}}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'login-history'}" @click="toggleMobileMenu">
                                {{$t('login_history')}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <!--  End-->
                <!-- Utility settings start-->
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#utility-settings" aria-controls="utility-settings" aria-expanded="false">
                        <div class="">
                            <i data-feather="settings"></i>                            
                            <span>{{ $t('utility-settings') }}</span>
                        </div>
                        <div>
                            <i data-feather="chevron-right"></i>
                        </div>
                    </a>

                    <ul id="utility-settings" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li>
                            <router-link :to="{name:'country'}" @click="toggleMobileMenu">
                                {{$t('country')}}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/province" @click="toggleMobileMenu">
                                {{$t('province')}}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/city" @click="toggleMobileMenu">
                                {{$t('city')}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <!-- End-->
            </perfect-scrollbar>
        </nav>
    </div>
    <!--  END SIDEBAR  -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import feather from 'feather-icons';

const menu_collapse = ref('dashboard');

onMounted(() => {
    feather.replace();
    const selector = document.querySelector('#sidebar a[href="' + window.location.pathname + '"]');
    if (selector) {
        const ul = selector.closest('ul.collapse');
        if (ul) {
            let ele = ul.closest('li.menu').querySelectorAll('.dropdown-toggle');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        } else {
            selector.click();
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 991) {
        store.commit('toggleSideBar', !store.state.is_show_sidebar);
    }
};
</script>
