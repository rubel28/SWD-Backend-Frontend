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
                                <li class="breadcrumb-item active" aria-current="page"><span>User Profile</span></li>
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
                                                            <BaseSelect
                                                                id="user-type"
                                                                label="User Type"
                                                                :required-field="false"
                                                                v-model="form.user_type"
                                                                @change="user_type_change()"
                                                                :options="{'personal':'Personal','company':'Company'}"
                                                            />
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
                                                    </div>
                                                    <!--/ Mobile Number -->
    
                                                    <!-- Email -->
                                                    <div class="col-md-4">
                                                        <BaseEmailInput
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
                                                    </div>
                                                    <!--/ Email -->
    
                                                    <!-- Role -->
                                                    <div class="col-md-4">
                                                        <BaseSelect
                                                            id="user_role"
                                                            label="User Role"
                                                            ref="user_role"
                                                            label-id="user_role"
                                                            :required-field="true"
                                                            v-model="form.user_role"
                                                            :options="{'admin':'Admin','user':'User'}"
                                                            :is-submit-form="personal ? is_submit_form:is_submit_form_company"
                                                        />
                                                    </div>
                                                    <!--/ Role -->
    
                                                    <!-- Status -->
                                                    <div class="col-md-4">
                                                        <BaseSelect
                                                            id="active_status"
                                                            label="Status"
                                                            :required-field="false"
                                                            v-model="form.active_status"
                                                            :options="{'ACTIVE':'Active','IN-ACTIVE':'In-active'}"
                                                        />                                                            
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
                                                        <TInput
                                                            id="father-name"
                                                            label="Father Name"
                                                            placeholder="Father Name"
                                                            type="text"
                                                            :required-field="false"
                                                            v-model="form.father_name"
                                                        />
                                                    </div>
                                                    <!--/ Father Name -->
    
                                                    <!-- Mother Name -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="mother-name"
                                                                label="Mother Name"
                                                                placeholder="Mother Name"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.mother_name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Mother Name -->
    
                                                    <!-- Spouse -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="spouse"
                                                                label="Spouse Name"
                                                                placeholder="Spouse Name"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.spouse_name"
                                                            />
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
                                                            <BaseSelect
                                                                id="gender"
                                                                label="Gender"
                                                                :required-field="false"
                                                                v-model="form.gender"
                                                                :options="{'male':'Male','female':'Female','other':'Other'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Gender -->
    
                                                    <!-- Marital Status -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="marital-status"
                                                                label="Marital Status"
                                                                :required-field="false"
                                                                v-model="form.marital_status"
                                                                :options="{'married':'Married','unmarried':'Unmarried','other':'Other'}"
                                                            />                                                        </div>
                                                    </div>
                                                    <!--/ Marital Status -->
    
                                                    <!-- Nationality -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="nationality"
                                                                label="Nationality"
                                                                :required-field="false"
                                                                v-model="form.nationality"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Nationality -->
    
                                                    <!-- Occupation -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="occupation"
                                                                label="Occupation"
                                                                :required-field="false"
                                                                v-model="form.occupation"
                                                                :options="{private_service:'Private Service',worker:'Worker',business:'Business'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Occupation -->
    
                                                    <!-- ID Type * -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="id-type"
                                                                label="ID Type"
                                                                ref="id_type"
                                                                label-id="id_type"
                                                                :required-field="true"
                                                                v-model="form.id_type"
                                                                :options="{'passport':'Passport','id':'ID'}"
                                                                :is-submit-form="is_submit_form"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ ID Type -->
    
                                                    <!-- ID No * -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="id-no"
                                                                label="ID Number"
                                                                placeholder="ID Number *"
                                                                ref="id_no"
                                                                label-id="id_no"
                                                                type="text"
                                                                :required-field="true"
                                                                v-model="form.id_no"
                                                                :is-submit-form="is_submit_form"
                                                            />                                                            
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
                                                            <BaseSelect
                                                                id="issue-country"
                                                                label="ID Issue Country"
                                                                ref="issue_country"
                                                                label-id="issue_country"
                                                                :required-field="true"
                                                                v-model="form.issue_country"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                                :is-submit-form="is_submit_form"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ ID Issue Country -->
                                                    
                                                    <!-- KYC Status -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="kyc_status"
                                                                label="KYC Status"
                                                                :required-field="false"
                                                                v-model="form.kyc_status"
                                                                :options="{success:'Success',pending:'Pending',canceled:'Canceled'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ KYC Status -->
                                                    
                                                    <!-- Risk Profiling -->
                                                    <div v-show="personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="risk_profile"
                                                                label="Risk Profiling"
                                                                :required-field="false"
                                                                v-model="form.risk_profile"
                                                                :options="{high:'High',medium:'Medium',low:'Low'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Risk Profiling -->                                               
                                                    
                                                    <!-- Source Fund -->
                                                    <div v-show="personal" class="col-md-6">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="source_fund"
                                                                label="Source of Fund"
                                                                :required-field="false"
                                                                v-model="form.source_fund"
                                                                :options="{salary:'Salary',business:'Business'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Source Fund -->

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

                                                    <!-- Business Category -->
                                                    <div v-show="!personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="business_category"
                                                                label="Business Category"
                                                                :required-field="false"
                                                                v-model="form.business_category"
                                                                :options="{1:'Category 1',2:'Category 2',3:'Category 3'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Business Category -->

                                                    <!-- Company Registration No -->
                                                    <div v-show="!personal" class="col-md-4">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="company-reg-no"
                                                                label="Company Registration No"
                                                                placeholder="Company Registration No *"
                                                                ref="company_reg_no"
                                                                label-id="company_reg_no"
                                                                type="text"
                                                                :required-field="true"
                                                                v-model="form.company_reg_no"
                                                                :is-submit-form="is_submit_form_company"
                                                            />                                                            
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
                                                            <BaseEmailInput
                                                                id="contact_email"
                                                                label="Contact Email Address"
                                                                placeholder="Contact Email Address"
                                                                type="email"
                                                                :required-field="false"
                                                                v-model="form.contact_email"
                                                                :is-submit-form="is_submit_form_company"
                                                                :is-valid-email ="email_validate(form.contact_email)"
                                                            />                                                            
                                                        </div>
                                                    </div>
                                                    <!--/ Contact Email -->
                                                </div>
                                                <div class="row">
                                                    <!-- Present/Company Address -->
                                                    <div class="col-md-9">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="address"
                                                                :label="personal ? 'Present':'Company'"
                                                                :placeholder="personal ? 'Present Address':'Company Address'"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Present Address -->
                                                    
                                                    <!-- Present Post Code -->
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="postCode"
                                                                label="Post Code"
                                                                placeholder="Post Code"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.post_code"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Present Post Code -->
                                                    
                                                    <!-- present Country -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="country"
                                                                label="Country"
                                                                :required-field="false"
                                                                v-model="form.country"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ present Country -->
                                                    
                                                    <!-- present state -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="province"
                                                                label="Province"
                                                                :required-field="false"
                                                                v-model="form.province"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ present state -->
                                                    
                                                    <!-- present city -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="city"
                                                                label="City"
                                                                :required-field="false"
                                                                v-model="form.city"
                                                                :options="{dhaka:'Dhaka',khulna:'Khulna',sylhet:'Sylhet'}"
                                                            />
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
                                                            <TInput
                                                                id="permanent-address"
                                                                label="Permanent Address"
                                                                placeholder="Permanent Address"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.permanent_address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Address -->
    
                                                    <!-- Permanent Post Code -->
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <TInput
                                                                id="permanent-postCode"
                                                                label="Post Code"
                                                                placeholder="Post Codes"
                                                                type="text"
                                                                :required-field="false"
                                                                v-model="form.permanent_post_code"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Post Code -->
    
                                                    <!-- Permanent Country -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="permanent-country"
                                                                label="Country"
                                                                :required-field="false"
                                                                v-model="form.permanent_country"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent Country -->
    
                                                    <!-- Permanent state -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="permanent-province"
                                                                label="Province"
                                                                :required-field="false"
                                                                v-model="form.permanent_province"
                                                                :options="{bd:'Bangladesh',sg:'Singapore',myr:'Malaysia'}"
                                                            />
                                                        </div>
                                                    </div>
                                                    <!--/ Permanent state -->
    
                                                    <!-- Permanent city -->
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <BaseSelect
                                                                id="permanent-city"
                                                                label="City"
                                                                :required-field="false"
                                                                v-model="form.permanent_city"
                                                                :options="{dhaka:'Dhaka',khulna:'Khulna',sylhet:'Sylhet'}"
                                                            />
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
                        <button type="button" class="btn btn-danger" @click="handle_cancel()">Cancel</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.multiselect {
    border: 1px solid #bfc9d4;
    border-radius: 6px;
}
</style>

<script setup>
import {nextTick, onMounted, ref} from 'vue';
    import '@/assets/sass/scrollspyNav.scss';
    import '@/assets/sass/users/user-account.scss';
    import feather from 'feather-icons';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import TInput from '@/components/form/core/BaseInput.vue';
    import BaseEmailInput from '@/components/form/core/BaseEmailInput.vue';
    import BaseSelect from '@/components/form/core/BaseSelect.vue';
    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    import { useMeta } from '@/composables/use-meta';
    import useValidation from "@/composables/useValidation";
    import useShowMessage from "@/composables/useShowMessage";
    import { useRouter } from 'vue-router';

    useMeta({ title: 'User Profile' });
    const router = useRouter()
    /* Import composable file */
    const { validation,email_validate, field_name } = useValidation();
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
    const is_submit_form = ref(false);
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
        console.log(form.value);
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
    
    /* Cancel*/
    const handle_cancel = () => {
        router.push({name:'users'});
    };
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
