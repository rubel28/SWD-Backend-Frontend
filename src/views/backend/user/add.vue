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
                                        <i data-feather="home"></i>
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
            <form @submit.prevent="submit_form">
                <div class="account-content">
                    <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                <div class="section general-info">
                                    <div class="info">
                                        <h5 class="">Login Information</h5>
                                        <div class="row">
                                            <div class="col-md-11 mx-auto">
                                                <div class="row">
                                                    <!-- User Type -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="user-type">User Type</label>
                                                            <select v-model="form.user_type" @change="user_type_change()" id="user-type" class="form-select">
                                                                <option value="" disabled>Select User Type</option>
                                                                <option value="personal">Personal</option>
                                                                <option value="company">Company</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ User Type -->
    
                                                    <!-- Name -->
                                                    <div class="col-md-4">
                                                        <TInput
                                                            id="full_name"
                                                            label="Name"
                                                            placeholder="Name *"
                                                            ref="name"
                                                            label-id="name"
                                                            type="text"
                                                            :required-field="true"
                                                            v-model="form.name"
                                                            :is-submit-form="personal ? is_submit_form:is_submit_form_company"
                                                        />
<!--                                                        <div class="form-group">
                                                            <label id="name" for="full_name">Name</label>
                                                            <input ref="name" v-model="form.name" id="full_name" type="text" class="form-control" placeholder="Name *" 
                                                                   :class="[(personal ? is_submit_form:is_submit_form_company) ? (form.name ? 'is-valid' : 'is-invalid') : '']" />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the name</div>
                                                        </div>-->
                                                    </div>
                                                    <!--/ Name -->
    
                                                    <!-- Mobile Number -->
                                                    <div class="col-md-4">
                                                        <TInput
                                                            id="mobile"
                                                            label="Mobile Number"
                                                            placeholder="Mobile Number *"
                                                            ref="mobile_number"
                                                            label-id="mobile_number"
                                                            type="text"
                                                            :required-field="true"
                                                            v-model="form.mobile_number"
                                                            :is-submit-form="personal ? is_submit_form:is_submit_form_company"
                                                        />
<!--                                                        <div class="form-group">
                                                            <label id="mobile_number" for="mobile">Mobile Number</label>
                                                            <input ref="mobile_number" v-model="form.mobile_number"
                                                                   id="mobile" type="text"
                                                                   class="form-control"
                                                                   placeholder="Mobile Number *"
                                                                   :class="[(personal ? is_submit_form:is_submit_form_company) ? (form.mobile_number ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the mobile number</div>
                                                        </div>-->
                                                    </div>
                                                    <!--/ Mobile Number -->
    
                                                    <!-- Email -->
                                                    <div class="col-md-4">
                                                        <EInput
                                                            id="e_mail"
                                                            label="Email Address"
                                                            placeholder="Email Address *"
                                                            ref="email"
                                                            label-id="email"
                                                            type="email"
                                                            :required-field="true"
                                                            v-model="form.email"
                                                            :is-submit-form ="personal ? is_submit_form:is_submit_form_company"
                                                            :is-valid-email ="email_validate(form.email)"
                                                        />
<!--                                                        <div class="form-group">
                                                            <label id="email" for="e_mail">Email Address</label>
                                                            <input
                                                                v-model="form.email"
                                                                type="email"
                                                                class="form-control"
                                                                id="e_mail"
                                                                placeholder="Email *"
                                                                :class="[(personal ? is_submit_form:is_submit_form_company) ? ( form.email && email_validate(form.email) ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                                        </div>-->
                                                    </div>
                                                    <!--/ Email -->
    
                                                    <!-- Role -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="user_role" for="user-role">User Role</label>
                                                            <select ref="user_role" v-model="form.user_role" id="user-role" class="form-select"
                                                                    :class="[(personal ? is_submit_form:is_submit_form_company) ? (form.user_role ? 'is-valid' : 'is-invalid') : '']">
                                                                <option value="" disabled>Select User Role *</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="user">User</option>
                                                            </select>
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please Select User Role</div>
                                                        </div>
                                                    </div>
                                                    <!--/ Role -->
    
                                                    <!-- Status -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="active_status">Status</label>
                                                            <select v-model="form.active_status" id="active_status" class="form-select" >
                                                                <option value="" disabled>Select Status *</option>
                                                                <option value="ACTIVE">Active</option>
                                                                <option value="IN-ACTIVE">In-active</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Status -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                <div class="section details">
                                    <div class="info">
                                        <h5 class="">{{personal ? 'Details Information':'Company Details'}}</h5>
                                        <div class="row">
                                            <div class="col-md-11 mx-auto">
                                                <div v-show="personal" class="row">
                                                    <!-- Father Name -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="father-name">Father Name</label>
                                                            <input ref="father_name" v-model="form.father_name" id="father-name" type="text" class="form-control"
                                                                   placeholder="Father Name" />                                                        
                                                        </div>
                                                    </div>
                                                    <!--/ Father Name -->
    
                                                    <!-- Mother Name -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="mother-name">Mother Name</label>
                                                            <input ref="mother_name" v-model="form.mother_name" id="mother-name" type="text" class="form-control"
                                                                   placeholder="Mother Name" />
                                                        </div>
                                                    </div>
                                                    <!--/ Mother Name -->
    
                                                    <!-- Spouse -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="spouse">Spouse Name</label>
                                                            <input ref="spouse" v-model="form.spouse_name" id="spouse" type="text" class="form-control"
                                                                   placeholder="Spouse Name" />
                                                        </div>
                                                    </div>
                                                    <!--/ Spouse -->
    
                                                    <!-- DOB -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="dob">Date of Birth</label>
                                                            <flat-pickr v-model="form.dob" id="dob"
                                                                        placeholder="Select Date"
                                                                        :config="{maxDate:'today'}"
                                                                        class="form-control flatpickr active"
                                                            ></flat-pickr>
                                                        </div>
                                                    </div>
                                                    <!--/ DOB -->
    
                                                    <!-- Gender -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="gender">Gender</label>
                                                            <select v-model="form.gender" id="gender" class="form-select">
                                                                <option value="" disabled>Select gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Gender -->
    
                                                    <!-- Marital Status -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="marital-status">Marital Status</label>
                                                            <select v-model="form.marital_status" id="marital-status" class="form-select">
                                                                <option value="" disabled>Select Marital Status</option>
                                                                <option value="married">Married</option>
                                                                <option value="unmarried">Unmarried</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Marital Status -->
    
                                                    <!-- Nationality -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="nationality">Nationality</label>
                                                            <select v-model="form.nationality" id="nationality" class="form-select" >
                                                                <option value="" disabled>Select nationality</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Nationality -->
    
                                                    <!-- Occupation -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="occupation">Occupation</label>
                                                            <select v-model="form.occupation" id="occupation" class="form-select">
                                                                <option value="" disabled>Select occupation</option>
                                                                <option value="private_service">Private Service</option>
                                                                <option value="worker">Worker</option>
                                                                <option value="business">Business</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Occupation -->
    
                                                    <!-- ID Type * -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="id_type" for="id-type">ID Type</label>
                                                            <select ref="id_type" v-model="form.id_type" id="id-type" class="form-select" :class="[is_submit_form ? (form.id_type ? 'is-valid' : 'is-invalid') : '']">
                                                                <option value="" disabled>Select ID Type *</option>
                                                                <option value="passport">Passport</option>
                                                                <option value="id">ID</option>
                                                            </select>
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please select ID type</div>
                                                        </div>
                                                    </div>
                                                    <!--/ ID Type -->
    
                                                    <!-- ID No * -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="id_no" for="id-no">ID Number</label>
                                                            <input ref="id_no" v-model="form.id_no"
                                                                   id="id-no" type="text"
                                                                   class="form-control"
                                                                   placeholder="ID Number *"
                                                                   :class="[is_submit_form ? (form.id_no ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the ID number</div>
                                                        </div>
                                                    </div>
                                                    <!--/ ID No -->
                                                    
                                                    <!-- ID Issue Date -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="issue_date">ID Issue Date</label>
                                                            <flat-pickr v-model="form.issue_date" id="issue_date"
                                                                        placeholder="Select Date"
                                                                        :config="{maxDate: 'today'}"
                                                                        class="form-control flatpickr active"
                                                            ></flat-pickr>
                                                        </div>
                                                    </div>
                                                    <!--/ ID Issue Date -->
                                                    
                                                    <!-- ID Expire Date -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="id_expire_date">ID Expire Date</label>
                                                            <flat-pickr v-model="form.id_expire_date" id="id_expire_date"
                                                                        placeholder="Select Date"
                                                                        :config="{minDate:'today'}"
                                                                        class="form-control flatpickr active"
                                                            ></flat-pickr>
                                                        </div>
                                                    </div>
                                                    <!--/ ID Expire Date -->
                                                </div>
                                                <div class="row">  
                                                    <!-- ID Issue Country * -->
                                                    <div v-show="personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="issue_country" for="issue-country">ID Issue Country</label>
                                                            <select ref="issue_country" v-model="form.issue_country" id="issue-country" class="form-select" :class="[is_submit_form ? (form.issue_country ? 'is-valid' : 'is-invalid') : '']">
                                                                <option value="" disabled>Select Country *</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please Select the Country</div>
                                                        </div>
                                                    </div>
                                                    <!--/ ID Issue Country -->
                                                    
                                                    <!-- KYC Status -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="kyc_status">KYC Status</label>
                                                            <select v-model="form.kyc_status" id="kyc_status" class="form-select">
                                                                <option value="" disabled>Select Status</option>
                                                                <option value="success">Success</option>
                                                                <option value="pending">Pending</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ KYC Status -->
                                                    
                                                    <!-- Risk Profiling -->
                                                    <div v-show="personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="risk_profile">Risk Profiling</label>
                                                            <select v-model="form.risk_profile" id="risk_profile" class="form-select" >
                                                                <option value="" disabled>Select Risk</option>
                                                                <option value="high">High</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="low">Low</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Risk Profiling -->
                                                
                                                    <!-- Source Wealth -->
                                                    <div v-show="personal" class="col-md-6">
                                                        <div class="form-group select2">
                                                            <label >Source of Wealth</label>
                                                            <multiselect
                                                                v-model="sw_option_value"
                                                                :options="sw_options"
                                                                :multiple="true"
                                                                :searchable="true"
                                                                :close-on-select="false"
                                                                track-by="id"
                                                                label="name"
                                                                placeholder="Select Source of Wealth"
                                                                selected-label=""
                                                                select-label=""
                                                                deselect-label=""
                                                            ></multiselect>
                                                        </div>
                                                    </div>
                                                    <!--/ Source Wealth -->
                                                    
                                                    <!-- Source Fund -->
                                                    <div v-show="personal" class="col-md-6">
                                                        <div class="form-group">
                                                            <label for="source_fund">Source of Fund</label>
                                                            <select v-model="form.source_fund" id="source_fund" class="form-select" >
                                                                <option value="" disabled>Select item</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Source Fund -->

                                                    <!-- Business Category -->
                                                    <div v-show="!personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="business_category">Business Category</label>
                                                            <select v-model="form.business_category" id="business_category" class="form-select">
                                                                <option value="" disabled>Select Business Category</option>
                                                                <option value="1">Category 1</option>
                                                                <option value="2">Category 2</option>
                                                                <option value="3">Category 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Business Category -->

                                                    <!-- Company Registration No -->
                                                    <div v-show="!personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="company_reg_no" for="company-reg-no">Company Registration No</label>
                                                            <input ref="company_reg_no" v-model="form.company_reg_no"
                                                                   id="company-reg-no" type="text"
                                                                   class="form-control"
                                                                   placeholder="Company Registration No *"
                                                                   :class="[is_submit_form_company ? (form.company_reg_no ? 'is-valid' : 'is-invalid') : '']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please fill the registration number</div>
                                                        </div>
                                                    </div>
                                                    <!--/ Company Registration No -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                <div class="section contact">
                                    <div class="info">
                                        <h5 class="">Contact Information</h5>
                                        <div class="row">
                                            <div class="col-md-11 mx-auto">
                                                <div v-show="!personal" class="row">
                                                    <!-- Contact Person -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="contact_person">Contact Person</label>
                                                            <input ref="contact_person" v-model="form.contact_person" id="contact_person" type="text" class="form-control" placeholder="Contact Person Name"
                                                                    />
                                                        </div>
                                                    </div>
                                                    <!--/ Contact Person -->

                                                    <!-- Contact Number -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="contact_mobile_number">Contact Mobile Number</label>
                                                            <input ref="contact_mobile_number" v-model="form.contact_mobile_number"
                                                                   id="contact_mobile_number" type="text"
                                                                   class="form-control"
                                                                   placeholder="Contact Mobile Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Contact Number -->

                                                    <!-- Contact Email -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="contact_email">Contact Email Address</label>
                                                            <input
                                                                v-model="form.contact_email"
                                                                type="email"
                                                                class="form-control"
                                                                id="contact_email"
                                                                placeholder="Contact Email Address"
                                                                :class="[ form.contact_email ? email_validate(form.contact_email) ? 'is-valid' : 'is-invalid':'']"
                                                            />
                                                            <div class="valid-feedback">Looks good!</div>
                                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                                        </div>
                                                    </div>
                                                    <!--/ Contact Email -->
                                                </div>
                                                <div class="row">
                                                    <!-- Present/Company Address -->
                                                    <div class="col-md-9">
                                                        <div class="form-group">
                                                            <label for="address">{{personal ?'Present':'Company'}} Address</label>
                                                            <input v-model="form.address" id="address" type="text" class="form-control" :placeholder="[[personal ? 'Present':'Company']] + ' Address'" />
                                                        </div>
                                                    </div>
                                                    <!--/ Present Address -->
                                                    
                                                    <!-- Present Post Code -->
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label for="postCode">Post Code</label>
                                                            <input v-model="form.post_code" id="postCode" type="text" class="form-control" placeholder="Post code" />
                                                        </div>
                                                    </div>
                                                    <!--/ Present Post Code -->
                                                    
                                                    <!-- present Country -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="country">Country</label>
                                                            <select v-model="form.country" id="country" class="form-select" >
                                                                <option value="" disabled>Select Country</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ present Country -->
                                                    
                                                    <!-- present province -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="province">Province</label>
                                                            <select v-model="form.province" id="province" class="form-select">
                                                                <option value="" disabled>Select province</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ present province -->
                                                    
                                                    <!-- present city -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="city">City</label>
                                                            <select v-model="form.city" id="city" class="form-select">
                                                                <option value="" disabled>Select city</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ present city -->
                                                </div>
                                                <div class="row" v-show="personal">
                                                    <!-- hr -->
                                                    <div class="col-md-12">
                                                        <hr style="border-color: #3b3f5c">
                                                    </div>
                                                    <!--/ hr -->
    
                                                    <!-- Permanent Address -->
                                                    <div class="col-md-9">
                                                        <div class="form-group">
                                                            <label for="permanent-address">Permanent Address</label>
                                                            <input v-model="form.permanent_address" id="permanent-address" type="text" class="form-control" placeholder="Permanent Address" />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Address -->
    
                                                    <!-- Permanent Post Code -->
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label for="permanent-postCode">Post Code</label>
                                                            <input v-model="form.permanent_post_code" id="permanent-postCode" type="text" class="form-control" placeholder="Post code" />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Post Code -->
    
                                                    <!-- Permanent Country -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="permanent-country">Country</label>
                                                            <select v-model="form.permanent_country" id="permanent-country" class="form-select" >
                                                                <option value="" disabled>Select Country</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Country -->
    
                                                    <!-- Permanent province -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="permanent-province">Province</label>
                                                            <select v-model="form.permanent_province" id="permanent-province" class="form-select">
                                                                <option value="" disabled>Select province</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent province -->
    
                                                    <!-- Permanent city -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="permanent-city">City</label>
                                                            <select v-model="form.permanent_city" id="permanent-city" class="form-select">
                                                                <option value="" disabled>Select city</option>
                                                                <option value="bd">Bangladesh</option>
                                                                <option value="sg">Singapore</option>
                                                                <option value="myr">Malaysia</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent city -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="personal" class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                <div class="section document">
                                    <div class="info">
                                        <h5 class="">Document Upload</h5>
                                        <div class="row">
                                            <div class="col-md-11 mx-auto">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="profile-pic">
                                                                Profile Photo
                                                                <a href="javascript:void(0)" @click="delete_image(1)" class="close" title="Clear Image"></a>
                                                            </label>
                                                            <div class="upload pe-md-6">
                                                                <input id="profile-pic" ref="fl_profile" type="file" class="d-none" accept="image/*" @change="change_file" />
                                                                <img
                                                                    v-if="form.profile_pic_path"
                                                                    :src="form.profile_pic_path"
                                                                    alt="profile"
                                                                    class="profile-preview"
                                                                    @click="$refs.fl_profile.click()"
                                                                />
                                                                <div v-else class="profile-preview upload-preview mt-2" @click="$refs.fl_profile.click()">
                                                                    <div class="mt-3">
                                                                        <SvgIcon icon="upload-cloud"></SvgIcon>
                                                                    </div>
                                                                    <div class="mt-2">Click to Upload Photo</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label id="scan_id" for="scan-id" class="is-invalid">
                                                                Scan ID*
                                                                <a href="javascript:void(0)" @click="delete_image(0)" class="close" title="Clear Image"></a>
                                                            </label>
                                                            <div class="upload pe-md-6">
                                                                <input id="scan-id" ref="scan_id" type="file" class="d-none" accept="image/*" @change="change_doc_file" />
                                                                <img
                                                                    v-if="form.scan_id_path"
                                                                    :src="form.scan_id_path"
                                                                    alt="profile"
                                                                    class="profile-preview"
                                                                    @click="$refs.scan_id.click()"
                                                                />
                                                                <div v-else class="profile-preview upload-preview mt-2" @click="$refs.scan_id.click()">
                                                                    <div class="mt-3">
                                                                        <SvgIcon icon="upload-cloud"></SvgIcon>
                                                                    </div>
                                                                    <div class="mt-2">Click to Upload ID</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-settings-footer">
                    <div class="as-footer-container">
                        <button type="button" class="btn btn-primary" @click="reset_from()">Reset All</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/user-account.scss';
    import feather from 'feather-icons';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import TInput from '@/components/form/core/TInput.vue';
    import EInput from '@/components/form/core/EInput.vue';
    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { useMeta } from '@/composables/use-meta';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";

    useMeta({ title: 'New User' });
    /* Import composable file */
    const { validation,email_validate,is_submit_form, field_name } = useValidation();
    const { showMessage } = useShowMessage();
    /* end */

    /* Flag for detect user type */
    const personal = ref(true);
    /* End */

    /* form data for v-model */
    const form = ref({
        user_type:'personal',name: '', mobile_number: '',email:'',user_role:'',active_status:'ACTIVE',
        father_name:'',mother_name:'',spouse_name:'',dob: '',gender: 'male',marital_status:'',
        nationality:'',occupation: '',id_type:'',id_no:'',issue_date:'',id_expire_date:'',
        issue_country:'',kyc_status:'',risk_profile:'low',source_wealth:[],source_fund:'',
        business_category:'',company_reg_no:'',
        contact_person:'',contact_mobile_number:'',contact_email:'',
        address:'',post_code:'',country: '',province:'',city:'',
        permanent_address:'',permanent_post_code:'',permanent_country:'',permanent_province:'',permanent_city:'',
        profile_pic:'',scan_id:'',profile_pic_path:'',scan_id_path:''
    });
    /* end */

    /* For Required Field Validation*/
    const is_submit_form_company = ref(false);
    const name = ref(null);
    const mobile_number = ref(null);
    const email = ref(null);
    const id_type = ref(null);
    const id_no = ref(null);
    const issue_country = ref(null);
    const scan_id = ref(null);
    const user_role = ref(null);
    const company_reg_no = ref(null);
    const validatePersonalData = ref({ name: '',mobile_number: '',email:'',user_role:'',id_type:'',id_no:'',issue_country:'',scan_id:'' })
    const validateCompanyData = ref({ name: '',mobile_number: '',email:'',user_role:'',company_reg_no:'' })
    /* End */
    const sw_options = ref([{ id:'salary',name:'Salary'}, {id:'business',name:'Business'}, {id:'others',name:'Others'}]);
    const sw_option_value = ref([]);
    /* Mounted hook */
    onMounted(() => {
        feather.replace();
    })

    /* Populate UI according to user type */
    const user_type_change = () => {
        personal.value = !personal.value;
    }

    /* File Upload functions */
    const change_file = (event) => {
        upload_file(event,1);
    };
    const change_doc_file = (event) => {
        upload_file(event,0);
    };
    /* End */

    /* Custom validation functions */
    function handle_validation_error() {
        let labelText = `${document.getElementById(field_name.value[0]).innerText} is required.`;
        nextTick(() => {
            //scroll to the first error
            let elementsInErrors = document.getElementsByClassName('is-invalid');
            if (elementsInErrors && elementsInErrors.length > 0) {
                elementsInErrors[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
        showMessage(labelText, 'error');// type => success/error
    }
    function setFieldValidation() {
        is_submit_form.value = false;
        is_submit_form_company.value = false;
        
        if (personal.value) {
            is_submit_form.value = true;
            validatePersonalData.value.name = form.value.name;
            validatePersonalData.value.mobile_number = form.value.mobile_number;
            validatePersonalData.value.email = form.value.email;
            validatePersonalData.value.user_role = form.value.user_role;
            validatePersonalData.value.id_type = form.value.id_type;
            validatePersonalData.value.id_no = form.value.id_no;
            validatePersonalData.value.issue_country = form.value.issue_country;
            validatePersonalData.value.scan_id = form.value.scan_id;
        } else {
            is_submit_form_company.value = true;
            validateCompanyData.value.name = form.value.name;
            validateCompanyData.value.mobile_number = form.value.mobile_number;
            validateCompanyData.value.email = form.value.email;
            validateCompanyData.value.user_role = form.value.user_role;
            validateCompanyData.value.company_reg_no = form.value.company_reg_no;
        }
    }
    /* end */

    // Save/Update data to database
    const submit_form = () => {
        setFieldValidation();
        if (validation(personal.value ? validatePersonalData:validateCompanyData)) {
            //form validated success
            showMessage('Form submitted successfully.','success');// type => success/error
        }else {
            eval(field_name.value[0]).value?.focus();
            handle_validation_error();
        }
    };
    
    /* Clear Image function */
    const delete_image = (flag) => {
        if(flag){
            form.value.profile_pic_path = '';
            form.value.profile_pic = '';
        }else{
            form.value.scan_id_path = '';
            form.value.scan_id = '';
        }
    };

    /* Image Upload function */
    function upload_file(event,flag) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if(flag){
                // The field to send on backend and apply validations
                form.value.profile_pic = reader.result;
                // The field to display here
                form.value.profile_pic_path = reader.result;
            }else {
                form.value.scan_id = reader.result;
                form.value.scan_id_path = reader.result;
            }
            event.target.value = "";
        };
        reader.readAsDataURL(file);
    }
    
    /* Reset form */
    const reset_from = () => {
        form.value.user_role = '';
        form.value.name = '';
        form.value.mobile_number = '';
        form.value.dob = '';
        form.value.marital_status ='';
        form.value.gender = 'male';
        form.value.post_code = '';
        form.value.occupation = '';
        form.value.permanent_address ='';
        form.value.permanent_post_code ='';
        form.value.country = '';
        form.value.city = '';
        form.value.province = '';
        form.value.address = '';
        form.value.permanent_country = '';
        form.value.permanent_city = '';
        form.value.permanent_province = '';
        form.value.email = '';
        form.value.nationality = '';
        form.value.source_fund = '';
        form.value.source_wealth = '';
        form.value.active_status = '';
        form.value.risk_profile = 'low';
        form.value.kyc_status = '';
        form.value.id_type = '';
        form.value.id_no = '';
        form.value.issue_country = '';
        form.value.issue_date = '';
        form.value.id_expire_date = '';
        form.value.profile_pic_path = '';
        form.value.scan_id_path = '';
        form.value.profile_pic = '';
        form.value.scan_id = '';
        //console.log(form.value);
    };

</script>
