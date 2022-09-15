<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <div class="header-container fixed-top">
            <header class="header navbar navbar-expand-sm">
                <!--Logo name start-->
                <ul class="navbar-item theme-brand flex-row text-center">
                    <li class="nav-item theme-logo">
                        <router-link to="/dashboard">
                            <img src="@/assets/images/logo.png" class="navbar-logo" alt="logo" />
                        </router-link>
                    </li>
                    <li class="nav-item theme-text">
                        <router-link to="/dashboard" class="nav-link"> SWD </router-link>
                    </li>
                </ul>
                <!--End-->
                <!--Sidebar menu start-->
                <div class="d-none horizontal-menu">
                    <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-menu"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </a>
                </div>
                <!--End-->
                <!--Search menu start-->
                <ul class="navbar-item flex-row ms-md-0 ms-auto">
                    <li class="nav-item align-self-center search-animated" :class="{ 'show-search': $store.state.is_show_search }">
                        <svg
                            @click="$store.commit('toggleSearch', !$store.state.is_show_search)"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-search toggle-search"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <form class="form-inline search-full form-inline search" :class="{ 'input-focused': $store.state.is_show_search }">
                            <div class="search-bar">
                                <input type="text" class="form-control search-form-control ms-lg-auto" placeholder="Search..." />
                            </div>
                        </form>
                    </li>
                </ul>
                <!--End-->
                <div class="navbar-item flex-row ms-md-auto">
                    <!--System mode menu start-->
                    <div class="dark-mode d-flex align-items-center">
                        <a v-if="$store.state.dark_mode == 'light'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('dark')">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-sun"
                            >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span class="ms-2">Light</span>
                        </a>
                        <a v-if="$store.state.dark_mode == 'dark'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('system')">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-moon"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <span class="ms-2">Dark</span>
                        </a>
                        <a v-if="$store.state.dark_mode == 'system'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('light')">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-airplay"
                            >
                                <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                                <polygon points="12 15 17 21 7 21 12 15"></polygon>
                            </svg>
                            <span class="ms-2">System</span>
                        </a>
                    </div>
                    <!--End-->
                    <!--Language menu start-->
                    <div class="dropdown nav-item language-dropdown btn-group">
                        <a href="javascript:;" id="ddllang" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only nav-link">
                            <img v-if="selectedLang" :src="require(`@/assets/images/flags/${selectedLang.code}.png`)" class="flag-width" alt="flag" />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="ddllang">
                            <perfect-scrollbar>
                                <li v-for="item in countryList" :key="item.code">
                                    <a href="javascript:;" class="dropdown-item d-flex align-items-center" :class="{ active: $i18n.locale === item.code }" @click.prevent="changeLanguage(item)">
                                        <img :src="require(`@/assets/images/flags/${item.code}.png`)" class="flag-width" alt="" /> <span>{{ item.name }}</span>
                                    </a>
                                </li>
                            </perfect-scrollbar>
                        </ul>
                    </div>
                    <!--End-->
                    <!--Profile and logout menu start-->
                    <div class="dropdown nav-item user-profile-dropdown btn-group">
                        <a href="javascript:" id="ddluser" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only user nav-link">
                            <img src="@/assets/images/profile-1.jpeg" alt="avatar" />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddluser">
                            <li role="presentation">
                                <router-link to="/dashboard" class="dropdown-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-user"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Profile
                                </router-link>
                            </li>
                            <li role="presentation">
                                <a href="javascript:void(0)" @click="handelLogout" class="dropdown-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-log-out"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Sign Out
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--End-->
                </div>
            </header>
        </div>
        <!--  END NAVBAR  -->
        <!--  BEGIN NAVBAR  -->
        <div class="sub-header-container">
            <header class="header navbar navbar-expand-sm">
                <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-menu"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </a>

                <!-- Portal vue/Teleport for Breadcrumb -->
                <div id="breadcrumb" class="vue-portal-target"></div>
            </header>
        </div>
        <!--  END NAVBAR  -->
        <!--  BEGIN TOPBAR  -->
        <div class="topbar-nav header navbar" role="banner">
            <nav class="topbar">
                <ul class="list-unstyled menu-categories" id="topAccordion">
                    <!--Dashboard menu start-->
                    <li class="menu single-menu">
                        <router-link to="/dashboard" class="dropdown-toggle">
                            <div class="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-home"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <span>{{ $t('dashboard') }}</span>
                            </div>
                        </router-link>
                    </li>
                    <!--End-->
                    <!--User Manage menu start-->
                    <li class="menu single-menu">
                        <a href="javascript:;" class="dropdown-toggle">
                            <div class="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-users"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <span>{{ $t('user_manage') }}</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="collapse submenu list-unstyled">
                            <li><router-link to="/users">{{$t('all_user')}}</router-link></li>
                            <li><router-link to="/user/login-history">{{$t('login_history')}}</router-link></li>

                            <!--                            <li class="sub-sub-submenu-list">
                                                            <a href="javascript:;">
                                                                Invoice
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    class="feather feather-chevron-right"
                                                                >
                                                                    <polyline points="9 18 15 12 9 6"></polyline>
                                                                </svg>
                                                            </a>
                                                            <ul class="collapse list-unstyled sub-submenu">
                                                                <li><router-link to="/apps/invoice/list">List</router-link></li>
                                                                <li><router-link to="/apps/invoice/preview">Preview</router-link></li>
                                                                <li><router-link to="/apps/invoice/add">Add</router-link></li>
                                                                <li><router-link to="/apps/invoice/edit">Edit</router-link></li>
                                                            </ul>
                                                        </li>-->
                        </ul>
                    </li>
                    <!--End-->
                    <!--Utility settings menu start-->
                    <li class="menu single-menu">
                        <a href="javascript:;" class="dropdown-toggle">
                            <div class="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-settings"
                                >
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                <span>{{ $t('utility-settings') }}</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="collapse submenu list-unstyled">
                            <li><router-link to="/country">{{$t('country')}}</router-link></li>
                            <li><router-link to="/province">{{$t('province')}}</router-link></li>
                            <li><router-link to="/city">{{$t('city')}}</router-link></li>
                        </ul>
                    </li>
                    <!--End-->

                    <!--                    <li class="menu single-menu">
                                            <a href="javascript:" class="dropdown-toggle">
                                                <div class="">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-file"
                                                    >
                                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                                        <polyline points="13 2 13 9 20 9"></polyline>
                                                    </svg>
                                                    <span>{{ $t('pages') }}</span>
                                                </div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevron-down"
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </a>
                                            <ul class="collapse submenu list-unstyled">
                                                <li><router-link to="/pages/helpdesk">Helpdesk</router-link></li>
                                                <li><router-link to="/pages/contact-us">Contact Form</router-link></li>
                                                <li><router-link to="/pages/faq">FAQ</router-link></li>
                                                <li><router-link to="/pages/faq2">FAQ 2</router-link></li>
                                                <li><router-link to="/pages/privacy-policy">Privacy Policy</router-link></li>
                                                <li><a target="_blank" href="/pages/coming-soon">Coming Soon</a></li>
                                                <li><router-link to="/pages/blank-page">Blank Page</router-link></li>
                                                <li><router-link to="/pages/sample">Sample Page</router-link></li>
                    
                                                <li><router-link to="/users/profile">Profile</router-link></li>
                                                <li><router-link to="/users/account-setting">Account Settings</router-link></li>
                                                <li class="sub-sub-submenu-list">
                                                    <a href="javascript:;" class="dropdown-toggle">
                                                        Error
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </a>
                                                    <ul class="collapse list-unstyled sub-submenu">
                                                        <li><a target="_blank" href="/pages/error404">404</a></li>
                                                        <li><a target="_blank" href="/pages/error500">500</a></li>
                                                        <li><a target="_blank" href="/pages/error503">503</a></li>
                                                        <li><a target="_blank" href="/pages/maintenence">Maintanence</a></li>
                                                    </ul>
                                                </li>
                                                <li class="sub-sub-submenu-list">
                                                    <a href="javascript:;" class="dropdown-toggle">
                                                        Login
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </a>
                                                    <ul class="collapse list-unstyled sub-submenu">
                                                        <li><a target="_blank" href="/auth/login">Login Cover</a></li>
                                                        <li><a target="_blank" href="/auth/login-boxed">Login Boxed</a></li>
                                                    </ul>
                                                </li>
                                                <li class="sub-sub-submenu-list">
                                                    <a href="javascript:" class="dropdown-toggle">
                                                        Register
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </a>
                                                    <ul class="collapse list-unstyled sub-submenu">
                                                        <li><a target="_blank" href="/auth/register">Register Cover</a></li>
                                                        <li><a target="_blank" href="/auth/register-boxed">Register Boxed</a></li>
                                                    </ul>
                                                </li>
                    
                                                <li class="sub-sub-submenu-list">
                                                    <a href="javascript:;" class="dropdown-toggle">
                                                        Password Recovery
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </a>
                                                    <ul class="collapse list-unstyled sub-submenu">
                                                        <li><a target="_blank" href="/auth/pass-recovery">Recover ID Cover</a></li>
                                                        <li><a target="_blank" href="/auth/pass-recovery-boxed">Recover ID Boxed</a></li>
                                                    </ul>
                                                </li>
                    
                                                <li class="sub-sub-submenu-list">
                                                    <a href="javascript:;" class="dropdown-toggle">
                                                        Lockscreen
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-chevron-right"
                                                        >
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </a>
                                                    <ul class="collapse list-unstyled sub-submenu">
                                                        <li><a target="_blank" href="/auth/lockscreen">Unlock Cover</a></li>
                                                        <li><a target="_blank" href="/auth/lockscreen-boxed">Unlock Boxed</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>-->

                </ul>
            </nav>
        </div>
        <!--  END TOPBAR  -->
    </div>
</template>

<script setup>
import '@/assets/sass/components/custom-sweetalert.scss';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useShowMessage from "@/composables/useShowMessage";
const store = useStore();
const router = useRouter();
const { showAlert } = useShowMessage();

const selectedLang = ref(null);
const countryList = ref(store.state.countryList);

const i18n = useI18n();

onMounted(() => {
    selectedLang.value = window.$appSetting.toggleLanguage();
    toggleMode();
});

const toggleMode = (mode) => {
    window.$appSetting.toggleMode(mode);
};

const changeLanguage = (item) => {
    selectedLang.value = item;
    window.$appSetting.toggleLanguage(item);

    i18n.locale.value = item.code;
};


function handelLogout(){
     store.dispatch('login/logout').then( async (res) => {
        //console.log(res.data.message);
        await router.push({name:'logout'});
        //showAlert(res.data.message);
    })
}
</script>
