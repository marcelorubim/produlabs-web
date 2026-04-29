import { GET_USERS_REQUEST,GET_USERS_FAILED,GET_USERS_SUCCESS } from "../types/UserActionTypes"
import * as UserService from "../services/users";
import * as LaboratoryService from "../services/laboratories";
import * as ExamService from "../services/exams";
import * as Productivity from "../services/productivity";


import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { GET_LABORATORIES_SUCCESS, GET_LABORATORIES_FAILED, GET_LABORATORIES_REQUEST } from "../types/LaboratoryActionTypes";
import { GET_EXAMS_REQUEST, GET_EXAMS_SUCCESS, GET_EXAMS_FAILED } from "../types/ExamActionTypes";
import { logoutUser } from "../actions/users";
import { UPDATE_EXAM_HISTORY, SHOW_LOADING, HIDE_LOADING } from "../types/ProductivityActionTypes";

function* fetchUser(action) {
    try {
       const users = yield call(UserService.getAll);
       yield put({type: GET_USERS_SUCCESS, payload: users});
    } catch (e) {
      yield checkError401(e)
       yield put({type: GET_USERS_FAILED, error: e});
    }
 }

 function* fetchLaboratories(action) {
   try {
      const laboratories = yield call(LaboratoryService.getAll);
      yield put({type: GET_LABORATORIES_SUCCESS, payload: laboratories});
   } catch (e) {
      yield checkError401(e)
      yield put({type: GET_LABORATORIES_FAILED, error: e});
   }
}

function* fetchExams(action) {
   try {
      const exams = yield call(ExamService.getAll);
      const sectors = yield call(ExamService.getSectors);
      yield put({type: GET_EXAMS_SUCCESS, exams, sectors});
   } catch (e) {
      yield checkError401(e)
      yield put({type: GET_EXAMS_FAILED, error: e});
   }
}

function* updateExamHistory(action){
   try {
      yield delay(500)
      yield put({type: SHOW_LOADING, examID: action.payload.id.examID}); 
      yield call(Productivity.saveExamHistory,action.payload);
      yield put({type: HIDE_LOADING}); 
   } catch (e) {
      yield put({type: HIDE_LOADING, error: e, examID: action.payload.id.examID}); 
      yield checkError401(e)
   }
}

function* checkError401({ response }) {
   if(response && response.status === 401){
      yield put(logoutUser());
   }
   
}


function* mySaga() {
    yield takeLatest(GET_USERS_REQUEST, fetchUser);
    yield takeLatest(GET_LABORATORIES_REQUEST, fetchLaboratories);
    yield takeLatest(GET_EXAMS_REQUEST,fetchExams)
    yield takeLatest(UPDATE_EXAM_HISTORY,updateExamHistory)

  }
  export default mySaga;