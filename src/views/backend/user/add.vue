<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="javascript:">
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
                                    </a>
                                </li>
                                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>New User</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="account-settings-container layout-top-spacing">
            <div class="account-content">
                <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form novalidate id="general-info" class="section general-info" @submit.stop.prevent="submit_form">
                                <div class="info">
                                    <h6 class="">New User Information</h6>
                                    <div class="row">
                                        <div class="col-lg-11 mx-auto">
                                            <div class="row">
                                                <div class="col-xl-2 col-lg-12 col-md-4">
                                                    <div class="upload mt-4 pe-md-4">
                                                        <input ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                        <img
                                                            :src="selected_file ? selected_file : require('@/assets/images/user-profile.jpeg')"
                                                            alt="profile"
                                                            class="profile-preview"
                                                            @click="$refs.fl_profile.click()"
                                                        />
                                                        <p class="mt-2">Upload Photo</p>
                                                    </div>
                                                </div>
                                                <div class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="fullName">Full Name</label>
                                                                    <input ref="name" v-model="form1.name" id="fullName" type="text" class="form-control" placeholder="Full Name" :class="[is_submit_form ? (form1.name ? 'is-valid' : 'is-invalid') : '']" />
                                                                    <div class="valid-feedback">Looks good!</div>
                                                                    <div class="invalid-feedback">Please fill the name</div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="mobile">Mobile Number</label>
                                                                    <input v-model="form1.mobile"
                                                                           id="mobile" type="text"
                                                                           class="form-control"
                                                                           placeholder="Mobile Number"
                                                                           :class="[is_submit_form ? (form1.mobile ? 'is-valid' : 'is-invalid') : '']"
                                                                    />
                                                                    <div class="valid-feedback">Looks good!</div>
                                                                    <div class="invalid-feedback">Please fill the mobile number</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-4">
                                                                <div class="form-group">
                                                                    <label for="dob">Date of Birth</label>
                                                                    <flat-pickr v-model="form1.dob" id="dob"
                                                                                    placeholder="Select Date"
                                                                                    class="form-control flatpickr active"
                                                                                    :class="[is_submit_form ? (form1.dob ? 'is-valid' : 'is-invalid') : '']"
                                                                    ></flat-pickr>
                                                                        <div class="valid-feedback">Looks good!</div>
                                                                        <div class="invalid-feedback">Please fill the date of birth</div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <div class="form-group">
                                                                    <label for="gender">Gender</label>
                                                                    <select v-model="form1.gender" id="gender" class="form-select" :class="[is_submit_form ? (form1.gender ? 'is-valid' : 'is-invalid') : '']">
                                                                        <option value="">Select gender</option>
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>
                                                                        <option value="other">Other</option>
                                                                    </select>
                                                                    <div class="valid-feedback">Looks good!</div>
                                                                    <div class="invalid-feedback">Please Select the gender</div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <div class="form-group">
                                                                    <label for="occupation">Occupation</label>
                                                                    <select v-model="form1.occupation" id="occupation" class="form-select" :class="[is_submit_form ? (form1.occupation ? 'is-valid' : 'is-invalid') : '']">
                                                                        <option value="">Select occupation</option>
                                                                        <option value="private_service">Private Service</option>
                                                                        <option value="worker">Worker</option>
                                                                        <option value="buniness">Business</option>
                                                                    </select>
                                                                    <div class="valid-feedback">Looks good!</div>
                                                                    <div class="invalid-feedback">Please Select the occupation</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="country">Country</label>
                                                        <select v-model="form1.country" id="country" class="form-select" :class="[is_submit_form ? (form1.country ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select Country</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Country</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="province">Province</label>
                                                        <select v-model="form1.province" id="province" class="form-select" :class="[is_submit_form ? (form1.province ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select province</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the province</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="city">City</label>
                                                        <select v-model="form1.city" id="city" class="form-select" :class="[is_submit_form ? (form1.city ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select city</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the city</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="postCode">Post Code</label>
                                                        <input v-model="form1.post_code" id="postCode" type="text" class="form-control" placeholder="Post code" :class="[is_submit_form ? (form1.post_code ? 'is-valid' : 'is-invalid') : '']" />
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please fill the post code</div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-sm-9">
                                                    <div class="form-group">
                                                        <label for="address">Address</label>
                                                        <input v-model="form1.address" id="address" type="text" class="form-control" placeholder="Address" :class="[is_submit_form ? (form1.address ? 'is-valid' : 'is-invalid') : '']" />
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please fill the address</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="nationality">Nationality</label>
                                                        <select v-model="form1.nationality" id="nationality" class="form-select" :class="[is_submit_form ? (form1.nationality ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select nationality</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Nationality</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label for="e_mail">Email Address</label>
                                                        <input
                                                            v-model="form1.email"
                                                            type="email"
                                                            class="form-control"
                                                            id="e_mail"
                                                            placeholder="Email"
                                                            :class="[is_submit_form ? (form1.email && email_validate(form1.email) ? 'is-valid' : 'is-invalid') : '']"
                                                        />
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please fill the Email</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="source_wealth">Source of Wealth</label>
                                                        <select v-model="form1.source_wealth" id="source_wealth" class="form-select" :class="[is_submit_form ? (form1.source_wealth ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select item</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Source of Wealth</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="source_fund">Source of Fund</label>
                                                        <select v-model="form1.source_fund" id="source_fund" class="form-select" :class="[is_submit_form ? (form1.source_fund ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select item</option>
                                                            <option value="bd">Bangladesh</option>
                                                            <option value="sg">Singapore</option>
                                                            <option value="myr">Malaysia</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select Source of Fund</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="currency">Default Currency</label>
                                                        <select v-model="form1.default_currency" id="currency" class="form-select" :class="[is_submit_form ? (form1.default_currency ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select currency</option>
                                                            <option value="SGD">SGD</option>
                                                            <option value="MYR">MYR</option>
                                                            <option valuue="USD">USD</option>
                                                            <option valuue="BDT">BDT</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Currency</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="active_status">Active Status</label>
                                                        <select v-model="form1.active_status" id="active_status" class="form-select" :class="[is_submit_form ? (form1.active_status ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select Status</option>
                                                            <option value="ACTIVE">Active</option>
                                                            <option value="IN-ACTIVE">In-active</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Status</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="risk_profile">Risk Profiling</label>
                                                        <select v-model="form1.risk_profile" id="risk_profile" class="form-select" :class="[is_submit_form ? (form1.risk_profile ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select Risk</option>
                                                            <option value="high">High</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="low">Low</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select the Risk</div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label for="kyc_status">KYC Status</label>
                                                        <select v-model="form1.kyc_status" id="kyc_status" class="form-select" :class="[is_submit_form ? (form1.kyc_status ? 'is-valid' : 'is-invalid') : '']">
                                                            <option value="">Select Status</option>
                                                            <option value="success">Success</option>
                                                            <option value="pending">Pending</option>
                                                        </select>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">Please Select Status</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-2 col-lg-12 col-md-4">
                                                    <div class="upload mt-4 pe-md-4">
                                                        <input ref="fl_doc" type="file" class="d-none" accept="image/*" @change="change_doc_file" />
                                                        <img
                                                            :src="selected_doc ? selected_doc : require('@/assets/images/user-profile.jpeg')"
                                                            alt="doc"
                                                            class="profile-preview"
                                                            @click="$refs.fl_doc.click()"
                                                        />
                                                        <p class="mt-2">Upload ID</p>
                                                    </div>
                                                </div>
                                                <div class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label for="id_type">ID Type</label>
                                                                <select v-model="form1.id_type" id="id_type" class="form-select" :class="[is_submit_form ? (form1.id_type ? 'is-valid' : 'is-invalid') : '']">
                                                                    <option value="">Select ID Type</option>
                                                                    <option value="passport">Passport</option>
                                                                    <option value="id">ID</option>
                                                                </select>
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please select ID type</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label for="id_no">ID Number</label>
                                                                <input v-model="form1.id_no"
                                                                       id="id_no" type="text"
                                                                       class="form-control"
                                                                       placeholder="ID Number"
                                                                       :class="[is_submit_form ? (form1.id_no ? 'is-valid' : 'is-invalid') : '']"
                                                                />
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please fill the ID number</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label for="issue_date">ID Issue Date</label>
                                                                <flat-pickr v-model="form1.issue_date" id="issue_date"
                                                                            placeholder="Select Date"
                                                                            class="form-control flatpickr active"
                                                                            :class="[is_submit_form ? (form1.issue_date ? 'is-valid' : 'is-invalid') : '']"
                                                                ></flat-pickr>
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please fill the ID Issue Date</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <div class="form-group">
                                                                <label for="id_expire_date">ID Expire Date</label>
                                                                <flat-pickr v-model="form1.id_expire_date" id="id_expire_date"
                                                                            placeholder="Select Date"
                                                                            class="form-control flatpickr active"
                                                                            :class="[is_submit_form ? (form1.id_expire_date ? 'is-valid' : 'is-invalid') : '']"
                                                                ></flat-pickr>
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please fill the ID Expire Date</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <div class="form-group">
                                                                <label for="issue_country">Issue Country</label>
                                                                <select v-model="form1.issue_country" id="issue_country" class="form-select" :class="[is_submit_form ? (form1.issue_country ? 'is-valid' : 'is-invalid') : '']">
                                                                    <option value="">Select Country</option>
                                                                    <option value="bd">Bangladesh</option>
                                                                    <option value="sg">Singapore</option>
                                                                    <option value="myr">Malaysia</option>
                                                                </select>
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please Select the Country</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="form-group">
                                                                <label for="password">Password</label>
                                                                <input v-model="form1.password"
                                                                       id="password" type="password"
                                                                       class="form-control"
                                                                       placeholder="Password"
                                                                       :class="[is_submit_form ? (form1.password ? 'is-valid' : 'is-invalid') : '']"
                                                                />
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please fill the password</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="form-group">
                                                                <label for="pin">Pin</label>
                                                                <input v-model="form1.pin"
                                                                       id="pin" type="password"
                                                                       class="form-control"
                                                                       placeholder="Pin"
                                                                       :class="[is_submit_form ? (form1.pin ? 'is-valid' : 'is-invalid') : '']"
                                                                />
                                                                <div class="valid-feedback">Looks good!</div>
                                                                <div class="invalid-feedback">Please fill the Pin</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12 d-flex justify-content-end">
                                                    <button type="submit" class="btn btn-success">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/account-setting.scss';

    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { useMeta } from '@/composables/use-meta';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";

    useMeta({ title: 'New User' });
    const { validation,email_validate,is_submit_form } = useValidation();
    const { showMessage } = useShowMessage();

    const selected = ref(null);
    const selected_file = ref(null);
    const selected_doc = ref(null);
    const form1 = ref({
        name: '', mobile: '', dob: '',
        gender: '',post_code:'', occupation: '',
        country: '',city:'',province:'',address:'',
        email:'',nationality:'',default_currency:'',
        source_fund:'',source_wealth:'',active_status:'',risk_profile:'',
        kyc_status:'',id_type:'',id_no:'',issue_country:'',issue_date:'',
        id_expire_date:'',password:'',pin:''
    });

    const change_file = (event) => {
        selected_file.value = URL.createObjectURL(event.target.files[0]);
    };
    const change_doc_file = (event) => {
        selected_doc.value = URL.createObjectURL(event.target.files[0]);
    };

    const submit_form = () => {
        is_submit_form.value = true;
        //const allValid = validation(form1);
        if (validation(form1)) {
            //form validated success
            showMessage('Form submitted successfully.','success');// type => success/error
        }else {
            showMessage('Field Validation Error!','error');// type => success/error
        }
    };

    const ddl_1 = ref('20');
    const ddl_2 = ref('Jan');
    const ddl_3 = ref('1989');
    const ddl_4 = ref('May');
    const ddl_5 = ref('2009');
    const ddl_6 = ref('United States');
    const months = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);


</script>
