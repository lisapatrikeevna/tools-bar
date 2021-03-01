import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useDispatch, useSelector} from "react-redux";
import {createUserTC} from "../../../../bll/userReduser";
import {Redirect} from "react-router-dom";
import Dashboard from "../../../components/dashboard/Dashboard";

const Register = () => {

  const userRecord = useSelector(state => state.users.userRecord)
  const dispatch = useDispatch()
  let [username,setUsername]=useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('lisa15')
  const createUsername = (e) => {
    setUsername(e.currentTarget.value)
  }
  const createEmail = (e) => {
    setEmail(e.currentTarget.value)
  }
  const createPassword = (e) => {
    setPassword(e.currentTarget.value)
  }
  const HandleRegister = ()=>{
    dispatch(createUserTC(email,password,username))
    setUsername('')
    setEmail('')
    setPassword('')
  }
  console.log(userRecord);

  if(userRecord){return <Redirect to='/login' />}

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username" value={username} onChange={createUsername}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" onChange={createEmail} value={email}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={createPassword}/>
                  </CInputGroup>
                  {/*<CInputGroup className="mb-4">*/}
                  {/*  <CInputGroupPrepend>*/}
                  {/*    <CInputGroupText>*/}
                  {/*      <CIcon name="cil-lock-locked" />*/}
                  {/*    </CInputGroupText>*/}
                  {/*  </CInputGroupPrepend>*/}
                  {/*  <CInput type="password" placeholder="Repeat password" autoComplete="new-password" />*/}
                  {/*</CInputGroup>*/}
                  <CButton color="success" block onClick={HandleRegister}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
