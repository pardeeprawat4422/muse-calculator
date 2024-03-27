import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import logo from '../../../assets/images/logo.svg';
import singleSVG from '../../../assets/images/svg/single.svg';
import marriedSVG from '../../../assets/images/svg/married.svg';
import yesSVG from '../../../assets/images/svg/yes.svg';
import noSVG from '../../../assets/images/svg/no.svg';
import ansDoneSVG from '../../../assets/images/svg/ans-done.svg';
import { ENUMFORPAGESABOUTUS, ENUMFORPAGESINCOME, HOUSEHOLD, LEAVEJOB, MARITALSTATUS, SPOUSE, STANDERD_DEDUCTION, ENUMFORTAB, ENUMFORPAGESCREDIT, DEPENDENTS, ENUMFORPAGESDEDUCTION, ENUMFORPAGESRESULT, Questions } from '../../../interfaces/interface';
import stepAboutYouSVG from '../../../assets/images/svg/step-aboutyou.svg';
import stepIncomeSVG from '../../../assets/images/svg/step-income.svg';
import stepCreditsSVG from '../../../assets/images/svg/step-credits.svg';
import stepDeductionsSVG from '../../../assets/images/svg/step-deductions.svg';
import stepResultsSVG from '../../../assets/images/svg/step-results.svg';
import stepDoneSVG from '../../../assets/images/svg/step-done.svg';

import interestSVG from '../../../assets/images/svg/interest.svg';
import dividendSVG from '../../../assets/images/svg/dividend.svg';
import retirementSVG from '../../../assets/images/svg/retirement.svg';
import selfEmploymentSVG from '../../../assets/images/svg/self-employment.svg';
import unemploymentSVG from '../../../assets/images/svg/unemployment.svg';
import noneApplySVG from '../../../assets/images/svg/none-apply.svg';

import otherDeductionsSVG from '../../../assets/images/svg/other-deductions.svg';
import iraContributionSVG from '../../../assets/images/svg/ira-contribution.svg';
import studentLoanInterestSVG from '../../../assets/images/svg/student-loan-interest.svg';
import medicalExpensesSVG from '../../../assets/images/svg/medical-expenses.svg';
import stateLooalTaxesSVG from '../../../assets/images/svg/state-looal-taxes.svg';
import charitableDonationsSVG from '../../../assets/images/svg/charitable-donations.svg';
import homeMortgageInterestSVG from '../../../assets/images/svg/home-mortgage-interest.svg';
import { array } from 'yup';
import { isEmptyObjectOrNullUndefiend } from '../../../Utility/Helper';

const Home = () => {
  const [taxCalculatorShow, setTaxCalculatorShow] = useState(false);
  const [questionPage, setquestionPage] = useState(ENUMFORPAGESABOUTUS.MARITAL_STATUS);
  const [tab, setTab] = useState(ENUMFORTAB.ABOUTUS);
  const [maritalStatus, setmaritalStatus] = useState<any>();
  const [spouse, setSpouse] = useState<any>();
  const [dependents, setDependents] = useState<any>();
  const [houseHold, setHouseHold] = useState<any>();
  const [age, setAge] = useState<any>();
  const [jobCount, setJobCount] = useState<any>(1);
  const [spouseJobCount, setSpouseJobCount] = useState<any>(1);
  const [priorJobCount, setPriorJobCount] = useState<any>(1);
  const [selfEmployement, setSelfEmployement] = useState<any>(1);
  const [dependentInfoCount, setDependentInfoCount] = useState<any>(1);
  const [leaveJob, setLeaveJob] = useState<any>();
  const [accountingType, setAccountingType] = useState<any>([]);
  const [progress, setProgress] = useState<any>(0);
  const [questionValues, setQuestionValues] = useState<any>();
  const [standerdDeduction, setStanderdDeduction] = useState<any>();
  const [deductionType, setDeductiontype] = useState<any>([]);
  const handleTaxCalculatorClose = () => setTaxCalculatorShow(false);
  const handleTaxCalculatorShow = () => setTaxCalculatorShow(true);
  const handleStartOver = () => {
    setmaritalStatus(null);
    setSpouse(null);
    setDependents(null);
    setHouseHold(null);
    setAge(null);
    setJobCount(1);
    setPriorJobCount(1);
    setDependentInfoCount(1);
    setPriorJobCount(1);
    setLeaveJob(null);
    setAccountingType([]);
    setQuestionValues(initValues);
    setSelectedTab(ENUMFORTAB.ABOUTUS);
    setquestionPage(ENUMFORPAGESABOUTUS.MARITAL_STATUS);
    setStanderdDeduction(null);
  }
  const initValues: Questions = {
    priorJobCount: 1,
    spouse_age: "",
    charitable: '',
    dependentAge: '',
    dependentDisable: '',
    dependentLivesWithMe: '',
    dependentStudent: '',
    dividend: '',
    homeMortagage: '',
    interest: '',
    IRA: '',
    other: '',
    otherCredit: '',
    retirement: '',
    selfEmpNetProfit: '',
    selfEmpQurtPayment: '',
    stateLocal: '',
    studentLoan: '',
    unemployement: '',
    medical: ''
  }

  const handleQuestionValue = (key, value) => {
    let data = { ...questionValues }
    if (key != null && value != null) {
      data[key] = value;
      console.log(data);
      setQuestionValues(data);
    }
  }
  const handleAccountingType = (addType) => {
    const index = accountingType.indexOf(addType);
    const newData = [...accountingType];
    if (!newData.includes(addType)) {
      if (addType === ENUMFORPAGESINCOME.NONEAPPLY) {
        // const newData = [...accountingType];
        setAccountingType([addType])
      } else {
        // accountingType.push(addType);
        let updateData = newData.filter((val) => val !== ENUMFORPAGESINCOME.NONEAPPLY);
        setAccountingType([...updateData, addType])
      }
    } else {
      const updateData = newData.filter((val) => val !== addType);
      setAccountingType(updateData);
    }

  }

  const handleNextAccounting = () => {
    // if (accountingType.length == 0) {
    //   setquestionPage(ENUMFORPAGESCREDIT.DEPENDENTS);
    //   return;
    // }
    if (accountingType.includes(ENUMFORPAGESINCOME.NONEAPPLY)) {
      setquestionPage(ENUMFORPAGESCREDIT.DEPENDENTS);
      onChangeTab(ENUMFORTAB.CREDIT);
    } else {

      const Array = ['INTEREST', 'DIVIDEND', 'RETIREMENT', 'SELF_EMPLOYEEMENT', 'UNEMPLOYEMENT'];
      const newData = Array.filter(val => accountingType.includes(val))[0];
      setquestionPage(newData)

    }
  }


  const handleNext = (addType) => {
    const Array = ['INTEREST', 'DIVIDEND', 'RETIREMENT', 'SELF_EMPLOYEEMENT', 'UNEMPLOYEMENT'];
    switch (addType) {
      case ENUMFORPAGESINCOME.INTEREST: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)
        } else {
          handleNext(ENUMFORPAGESINCOME.DIVIDEND)
        }
      }
        break;
      case ENUMFORPAGESINCOME.DIVIDEND: {
        if (accountingType.includes(addType)) {
          return setquestionPage(addType)
        } else {

          handleNext(ENUMFORPAGESINCOME.RETIREMENT)
        }
      }
        break;
      case ENUMFORPAGESINCOME.RETIREMENT: {
        if (accountingType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          handleNext(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT)
        }
      }
        break;
      case ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT: {
        if (accountingType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          handleNext(ENUMFORPAGESINCOME.UNEMPLOYEMENT)
        }
      }
        break;

      case ENUMFORPAGESINCOME.UNEMPLOYEMENT: {
        if (accountingType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          setquestionPage(ENUMFORPAGESCREDIT.DEPENDENTS)
          onChangeTab(ENUMFORTAB.CREDIT);
        }
      }
        break;

      default:
        break;
    }
  }


  const handleBack = (addType) => {
    const Array = ['INTEREST', 'DIVIDEND', 'RETIREMENT', 'SELF_EMPLOYEEMENT', 'UNEMPLOYEMENT'];

    switch (addType) {
      case ENUMFORPAGESINCOME.INTEREST: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)

        } else {
          setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE)
          // setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE)
        }
      }
        break;
      case ENUMFORPAGESINCOME.DIVIDEND: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBack(ENUMFORPAGESINCOME.INTEREST)
        }
      }
        break;
      case ENUMFORPAGESINCOME.RETIREMENT: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBack(ENUMFORPAGESINCOME.DIVIDEND)
        }
      }
        break;
      case ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBack(ENUMFORPAGESINCOME.RETIREMENT)
        }
      }
        break;

      case ENUMFORPAGESINCOME.UNEMPLOYEMENT: {
        if (accountingType.includes(addType)) {
          setquestionPage(addType)
        } else {
          handleBack(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT)
        }
      }
        break;

      case ENUMFORPAGESCREDIT.DEPENDENTS: {
        if (accountingType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          const Array = ['INTEREST', 'DIVIDEND', 'RETIREMENT', 'SELF_EMPLOYEEMENT', 'UNEMPLOYEMENT'];
          const newData = Array.filter(val => accountingType.includes(val));
          let lastElem = newData[newData.length - 1]
          console.log("lastElem", lastElem);
          setquestionPage(lastElem)
          onChangeTab(ENUMFORTAB.ABOUTUS);
        }
      }
        break;

      default:
        break;
    }
  }
  const handleNextDeductionType = () => {
    if (deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY)) {
      setquestionPage(ENUMFORPAGESRESULT.FINISH);
      onChangeTab(ENUMFORTAB.RESULTS);
    } else {

      const Array = ["HOME_MORTAGAGE", "CHARITABLE", "LOCAL_TAX", "MEDICAL", "STUDENT", "IRA", "OTHER"];
      const newData = Array.filter(val => deductionType.includes(val))[0];
      console.log(newData);
      setquestionPage(newData)


    }
  }
  const handleDeductiontype = (addType) => {

    const index = deductionType.indexOf(addType);
    const newData = [...deductionType];
    if (!newData.includes(addType)) {
      if (addType === ENUMFORPAGESDEDUCTION.NON_APPLY) {
        setDeductiontype([addType])
      }
      else {
        let updateData = newData.filter((val) => val !== ENUMFORPAGESDEDUCTION.NON_APPLY);
        setDeductiontype([...updateData, addType])
      }
    } else {
      const updateData = newData.filter((val) => val !== addType);
      setDeductiontype(updateData);
    }
  }

  const handleNextDeduction = (addType) => {
    const Array = ["HOME_MORTAGAGE", "CHARITABLE", "LOCAL_TAX", "MEDICAL", "STUDENT", "IRA", "OTHER"];

    switch (addType) {
      case ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE: {
        if (deductionType.includes(addType)) {

          setquestionPage(addType)
        } else {

          handleNextDeduction(ENUMFORPAGESDEDUCTION.CHARITABLE)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.CHARITABLE: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {

          handleNextDeduction(ENUMFORPAGESDEDUCTION.LOCAL_TAX)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.LOCAL_TAX: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {

          handleNextDeduction(ENUMFORPAGESDEDUCTION.MEDICAL)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.MEDICAL: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          handleNextDeduction(ENUMFORPAGESDEDUCTION.STUDENT)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.STUDENT: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          handleNextDeduction(ENUMFORPAGESDEDUCTION.IRA)
        }
      }
        break;

      case ENUMFORPAGESDEDUCTION.IRA: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          handleNextDeduction(ENUMFORPAGESDEDUCTION.OTHER)
          onChangeTab(ENUMFORTAB.DEDUCTION)
        }
      }
        break;

      case ENUMFORPAGESDEDUCTION.OTHER: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          setquestionPage(ENUMFORPAGESRESULT.FINISH)
          onChangeTab(ENUMFORTAB.RESULTS);

        }
      }
        break;

      default:
        break;
    }
  }
  const handleBackDeduction = (addType) => {
    const Array = ["NON_APPLY", "HOME_MORTAGAGE", "CHARITABLE", "LOCAL_TAX", "MEDICAL", "STUDENT", "IRA", "OTHER"];
    switch (addType) {
      case ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE: {
        if (deductionType.includes(addType)) {
          setquestionPage(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE)

        } else {
          setquestionPage(ENUMFORPAGESDEDUCTION.DEDUCTION_TYPE)
          // setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.CHARITABLE: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBackDeduction(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.LOCAL_TAX: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBackDeduction(ENUMFORPAGESDEDUCTION.CHARITABLE)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.MEDICAL: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {

          handleBackDeduction(ENUMFORPAGESDEDUCTION.LOCAL_TAX)
        }
      }
        break;

      case ENUMFORPAGESDEDUCTION.STUDENT: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {
          handleBackDeduction(ENUMFORPAGESDEDUCTION.MEDICAL)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.IRA: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {
          handleBackDeduction(ENUMFORPAGESDEDUCTION.STUDENT)
        }
      }
        break;
      case ENUMFORPAGESDEDUCTION.OTHER: {
        if (deductionType.includes(addType)) {
          setquestionPage(addType)
        } else {
          handleBackDeduction(ENUMFORPAGESDEDUCTION.IRA)

        }
      }
        break;

      case ENUMFORPAGESRESULT.FINISH: {
        if (deductionType.includes(addType)) {
          return setquestionPage(addType)
        } else {
          const Array = ["NON_APPLY", "HOME_MORTAGAGE", "CHARITABLE", "LOCAL_TAX", "MEDICAL", "STUDENT", "IRA", "OTHER"];
          const newData = Array.filter(val => deductionType.includes(val));
          let lastElem = newData[newData.length - 1]
          setquestionPage(lastElem)
          onChangeTab(ENUMFORTAB.DEDUCTION);
        }
      }
        break;

      default:
        break;
    }
  }
  const [selectedTab, setSelectedTab] = useState<any>(ENUMFORTAB.ABOUTUS);

  const onChangeTab = (type) => {
    if (selectedTab !== type) {
      setSelectedTab(type);
    }
  }

  return (
    <>
      <section className="main-banner">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={7}>
              <div className="inner-banner">
                <h2>Financial optimization for your platform</h2>
                <p>Muse analyzes real time transaction data so financial service providers can offer expert financial insights, increase engagement and boost customers’ finances.</p>
                <Button variant="primary" onClick={handleTaxCalculatorShow} size="lg">Calculate Tax</Button>
              </div>
            </Col>
          </Row>
        </Container>

      </section>

      <Modal className='modal-calculator' show={taxCalculatorShow} onHide={handleTaxCalculatorClose} size="lg" centered fullscreen={true}>
        <Modal.Body>
          <Button variant="modal-close" onClick={handleTaxCalculatorClose}><i className="bi bi-x"></i></Button>
          <div className="calculator-outer">
            <div className="calculator-left">
              <div className="calculator-sidebar">
                <div className="sidebar-logo">
                  <img src={logo} alt="Muse" />
                </div>
                <div className="sidebar-stepper">
                  <ul>
                    <li className={`${selectedTab !== ENUMFORTAB.ABOUTUS && (selectedTab === ENUMFORTAB.INCOME || selectedTab === ENUMFORTAB.CREDIT || selectedTab === ENUMFORTAB.DEDUCTION || selectedTab === ENUMFORTAB.RESULTS) && "done"} ${selectedTab === ENUMFORTAB.ABOUTUS && "active"}`} onClick={() => { onChangeTab(ENUMFORTAB.ABOUTUS) }}>
                      <div className="step-image">
                        <img src={stepAboutYouSVG} alt="Muse" />
                        <div className="step-done">
                          <img src={stepDoneSVG} alt="Muse" />
                        </div>
                      </div>
                      <div>
                        <h6>About You</h6>
                        <p>This will help us determine your filing status.</p>
                      </div>

                    </li>
                    <li className={`${selectedTab !== ENUMFORTAB.INCOME && (selectedTab === ENUMFORTAB.CREDIT || selectedTab === ENUMFORTAB.DEDUCTION || selectedTab === ENUMFORTAB.RESULTS) && "done"} ${selectedTab === ENUMFORTAB.INCOME && "active"}`}>
                      <div className="step-image">
                        <img src={stepIncomeSVG} alt="Muse" />
                        <div className="step-done">
                          <img src={stepDoneSVG} alt="Muse" />
                        </div>
                      </div>
                      <div>
                        <h6>Income</h6>
                        <p>Help pay for taxes for other sources of income</p>
                      </div>
                    </li>
                    <li className={`${selectedTab !== ENUMFORTAB.CREDIT && (selectedTab === ENUMFORTAB.DEDUCTION || selectedTab === ENUMFORTAB.RESULTS) && "done"} ${selectedTab === ENUMFORTAB.CREDIT && "active"}`}>
                      <div className="step-image">
                        <img src={stepCreditsSVG} alt="Muse" />
                        <div className="step-done">
                          <img src={stepDoneSVG} alt="Muse" />
                        </div>
                      </div>
                      <div>
                        <h6>Credits</h6>
                        <p>Include any qualifying children, relatives</p>
                      </div>
                    </li>
                    <li className={`${selectedTab !== ENUMFORTAB.DEDUCTION && (selectedTab === ENUMFORTAB.DEDUCTION || selectedTab === ENUMFORTAB.RESULTS) && "done"} ${selectedTab === ENUMFORTAB.DEDUCTION && "active"}`}>
                      <div className="step-image">
                        <img src={stepDeductionsSVG} alt="Muse" />
                        <div className="step-done">
                          <img src={stepDoneSVG} alt="Muse" />
                        </div>
                      </div>
                      <div>
                        <h6>Deductions</h6>
                        <p>Yes or No claiming itemized deductions.</p>
                      </div>
                    </li>
                    <li className={`${selectedTab === ENUMFORTAB.RESULTS && "active"}`}>
                      <div className="step-image">
                        <img src={stepResultsSVG} alt="Muse" />
                        <div className="step-done">
                          <img src={stepDoneSVG} alt="Muse" />
                        </div>
                      </div>
                      <div>
                        <h6>Results</h6>
                        <p>Your estimated total federal refund</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="sidebar-footer">
                  <ul>
                    <li>© Muse 2024</li>
                    <li><a href="mailto:info@musetax.com"><i className="bi bi-envelope"></i>info@musetax.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="calculator-right">
              <div className="calculator-forms-outer">
                <div className="calculator-card">
                  <div className="card-calculator-header">
                    <h5>Calculate your W-4</h5>
                    <div className="card-calculator-line" style={{ width: `${progress}%` }}></div >
                  </div>




                  {
                    (questionPage === ENUMFORPAGESABOUTUS.MARITAL_STATUS) && (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Are you single or married?</h4>
                              <p>This will help us determine your filing status, standard deduction, and which credits you can claim.</p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col" >
                                <div className={`card-answer ${maritalStatus === MARITALSTATUS.SINGLE ? 'active' : ''}`} onClick={() => { setmaritalStatus(MARITALSTATUS.SINGLE) }}>
                                  <div className="card-image">
                                    <img src={singleSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Single</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${maritalStatus === MARITALSTATUS.MERRIED ? 'active' : ''}`} onClick={() => { setmaritalStatus(MARITALSTATUS.MERRIED) }}>
                                  <div className="card-image">
                                    <img src={marriedSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Married</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <div></div>
                          {/* <Button variant="white" className="btn-icon-text"><i className="bi bi-arrow-left"></i>Back</Button> */}
                          <Button variant="primary" onClick={() => { maritalStatus === MARITALSTATUS.SINGLE ? setquestionPage(ENUMFORPAGESABOUTUS.HOUSEHOLD) : setquestionPage(ENUMFORPAGESABOUTUS.SPONSE); setProgress(progress + 3.333) }}>Next</Button>
                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESABOUTUS.SPONSE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Do you plan to file with your spouse?</h4>
                              <p>In most cases, filing jointly with your spouse results in a lower tax bill. This means you and your spouse report combined income and deduct your combined expenses. Choose No if you're married and plan to file separately.</p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col">
                                <div className={`card-answer ${spouse === SPOUSE.TRUE ? 'active' : ''}`} onClick={() => { setSpouse(SPOUSE.TRUE) }}>
                                  <div className="card-image">
                                    <img src={yesSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Yes</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${spouse === SPOUSE.FALSE ? 'active' : ''}`} onClick={() => { setSpouse(SPOUSE.FALSE) }}>
                                  <div className="card-image">
                                    <img src={noSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>No</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.MARITAL_STATUS) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.AGE); setProgress(progress + 3.3333) }}>Next</Button>
                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESABOUTUS.HOUSEHOLD) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Are you the head of household?</h4>
                              <p>Head of Household is a filing status for unmarried persons with a qualified person.</p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col">
                                <div className={`card-answer ${houseHold === HOUSEHOLD.TRUE ? 'active' : ''}`} onClick={() => { setHouseHold(HOUSEHOLD.TRUE) }}>
                                  <div className="card-image">
                                    <img src={yesSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Yes</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${houseHold === HOUSEHOLD.FALSE ? 'active' : ''}`} onClick={() => { setHouseHold(HOUSEHOLD.FALSE) }}>
                                  <div className="card-image">
                                    <img src={noSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>No</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.MARITAL_STATUS) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.AGE) }}>Next</Button>
                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESABOUTUS.AGE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Enter your age as of Jan 1, 2024.</h4>
                              <p>This helps us determine which age-specific tax breaks you might qualify for.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Enter Your Age"
                                >
                                  <Form.Control type="number" placeholder="Enter Your Age" max={100} min={1} onChange={(e) => { setAge(e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { maritalStatus === MARITALSTATUS.MERRIED ? setquestionPage(ENUMFORPAGESABOUTUS.SPONSE) : setquestionPage(ENUMFORPAGESABOUTUS.HOUSEHOLD) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(spouse === SPOUSE.TRUE ? ENUMFORPAGESABOUTUS.SPOUSE_AGE : ENUMFORPAGESABOUTUS.TOTAL_JOB) }}>Next</Button>
                        </div>

                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESABOUTUS.SPOUSE_AGE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Enter your spouse's age as of Jan 1, 2024.</h4>
                              <p>This helps us determine which age-specific tax breaks your spouse might qualify for.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Enter Your Age"
                                >
                                  <Form.Control type="number" placeholder="Enter Your Age" max={100} min={1} value={questionValues?.spouse_age} onChange={(e) => { handleQuestionValue("spouse_age", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.AGE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.TOTAL_JOB) }}>Next</Button>
                        </div>

                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESABOUTUS.TOTAL_JOB) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>How many total jobs do you and your spouse currently have?</h4>
                              <p>List all jobs that provide a W-2 (do not include 1099 jobs).</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel controlId="floatingSelect" label="Total Jobs">
                                  <Form.Select aria-label="Pay Frequency" onChange={(e) => { spouse === SPOUSE.TRUE ? setSpouseJobCount(e.target.value) : setJobCount(e.target.value) }}>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>
                                  </Form.Select>
                                </FloatingLabel>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { spouse === SPOUSE.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.SPOUSE_AGE) : setquestionPage(ENUMFORPAGESABOUTUS.AGE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { spouse === SPOUSE.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.SPOUSE_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.JOBDESC) }}>Next</Button>
                        </div>

                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESABOUTUS.SPOUSE_JOB) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>How much are you paid yearly for your current job(s)?</h4>
                              <p>Please input information from all W-2 jobs only.</p>
                            </div>
                            {Array.from({ length: spouseJobCount }, (_, i) => (
                              <div className="forms-answer-container">
                                <div className="forms-answer-header">
                                  <h6>Job {i + 1}</h6>
                                  <div className="button-group">
                                    <Button variant='icon'><i className="bi bi-pencil-square"></i></Button>
                                    {
                                      (spouseJobCount > 1) &&
                                      <Button variant="icon" className="text-danger" onClick={() => { setJobCount(spouseJobCount - 1) }}><i className="bi bi-trash"></i></Button>
                                    }
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div className="radio radio-primary form-check-inline">
                                    <input type="radio" id="myjob" name="businesstype" />
                                    <label htmlFor="myjob">My Job</label>
                                  </div>
                                  <div className="radio radio-primary form-check-inline">
                                    <input type="radio" id="spousejob" name="businesstype" />
                                    <label htmlFor="spousejob">Spouse job</label>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Yearly Salary"
                                  >
                                    <Form.Control type="text" placeholder="Yearly Salary" />
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">

                                  <FloatingLabel controlId="floatingSelect" label="Pay Frequency">
                                    <Form.Select aria-label="Pay Frequency">
                                      <option>Pay Frequency</option>
                                      <option value="biweekly">biweekly</option>
                                      <option value="monthly">monthly</option>
                                      <option value="quarterly">quarterly</option>
                                      <option value="semimonthly">semimonthly</option>
                                      <option value="weekly">weekly</option>
                                    </Form.Select>
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Withholding on last paycheck"
                                  >
                                    <Form.Control type="text" placeholder="Withholding on last paycheck" />
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Total withholding (year to date)"
                                  >
                                    <Form.Control type="text" placeholder="Total withholding (year to date)" />
                                  </FloatingLabel>
                                </div>
                              </div>
                            ))}
                            <div className="add-more-records">
                              <Button variant="link-button" className="btn-icon-text text-info" onClick={() => { (setSpouseJobCount(spouseJobCount + 1)) }}><i className="bi bi-plus-circle"></i>Add another job</Button>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.TOTAL_JOB) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { spouseJobCount == 2 ? setquestionPage(ENUMFORPAGESABOUTUS.SIMILAR_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.LEAVE_JOB) }}>Next</Button>
                        </div>

                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESABOUTUS.JOBDESC) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>How much are you paid yearly for your current job(s)?</h4>
                              <p>Please input information from all W-2 jobs only.</p>
                            </div>
                            {Array.from({ length: jobCount }, (_, i) => (
                              <div className="forms-answer-container">
                                <div className="forms-answer-header">
                                  <h6>Job {i + 1}</h6>
                                  <div className="button-group">
                                    <Button variant='icon'><i className="bi bi-pencil-square"></i></Button>
                                    {
                                      (jobCount > 1) &&
                                      <Button variant="icon" className="text-danger" onClick={() => { setJobCount(jobCount - 1) }}><i className="bi bi-trash"></i></Button>
                                    }
                                  </div>
                                </div>

                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Yearly Salary"
                                  >
                                    <Form.Control type="text" placeholder="Yearly Salary" />
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">

                                  <FloatingLabel controlId="floatingSelect" label="Pay Frequency">
                                    <Form.Select aria-label="Pay Frequency">
                                      <option>Pay Frequency</option>
                                      <option value="biweekly">biweekly</option>
                                      <option value="monthly">monthly</option>
                                      <option value="quarterly">quarterly</option>
                                      <option value="semimonthly">semimonthly</option>
                                      <option value="weekly">weekly</option>
                                    </Form.Select>
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Withholding on last paycheck"
                                  >
                                    <Form.Control type="text" placeholder="Withholding on last paycheck" />
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Total withholding (year to date)"
                                  >
                                    <Form.Control type="text" placeholder="Total withholding (year to date)" />
                                  </FloatingLabel>
                                </div>
                              </div>
                            ))}
                            <div className="add-more-records">
                              <Button variant="link-button" className="btn-icon-text text-info" onClick={() => { (setJobCount(jobCount + 1)) }}><i className="bi bi-plus-circle"></i>Add another job</Button>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.TOTAL_JOB) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { jobCount == 2 ? setquestionPage(ENUMFORPAGESABOUTUS.SIMILAR_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.LEAVE_JOB) }}>Next</Button>
                        </div>

                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESABOUTUS.SIMILAR_JOB) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>We've noticed that you currently have two jobs</h4>
                              <p>If these jobs pay a similar amount, you have the option to check the box below. If they're not similar and you check the box, the lower paying job may have too much withheld.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="twojobs" value="Two Jobs" />
                                <label htmlFor="twojobs">Split withholdings more evenly</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.JOBDESC) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESABOUTUS.LEAVE_JOB) }}>Next</Button>
                        </div>

                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESABOUTUS.LEAVE_JOB) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Did you leave a job this year?</h4>
                              <p>To account for tax you've already paid, we need to know how much you've already withheld this year.</p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col">
                                <div className={`card-answer ${leaveJob === LEAVEJOB.TRUE ? 'active' : ''}`} onClick={() => { setLeaveJob(LEAVEJOB.TRUE) }}>
                                  <div className="card-image">
                                    <img src={yesSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Yes</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${leaveJob === LEAVEJOB.FALSE ? 'active' : ''}`} onClick={() => { setLeaveJob(LEAVEJOB.FALSE) }}>
                                  <div className="card-image">
                                    <img src={noSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>No</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { jobCount == 2 ? setquestionPage(ENUMFORPAGESABOUTUS.SIMILAR_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.JOBDESC) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { leaveJob === LEAVEJOB.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.PRIOR_JOB) : setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE); onChangeTab(ENUMFORTAB.INCOME) }}>Next</Button>
                          {/* <Button variant="primary" onClick={() => { leaveJob === LEAVEJOB.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.PRIOR_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.PRIOR_JOB) }}>Next</Button> */}

                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESABOUTUS.PRIOR_JOB) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>How much were you paid for your prior job(s)?</h4>
                              <p>You can find how much tax you've already paid in withholding on your final paycheck from your previous employer.</p>
                            </div>

                            {Array.from({ length: priorJobCount }, (_, i) => (
                              <div className="forms-answer-container">
                                <div className="forms-answer-header">
                                  <h6>Prior job {i + 1}</h6>
                                  <div className="button-group">
                                    <Button variant='icon'><i className="bi bi-pencil-square"></i></Button>
                                    {
                                      (priorJobCount > 1) && (
                                        <Button variant="icon" className="text-danger" onClick={() => { setPriorJobCount(priorJobCount - 1) }}><i className="bi bi-trash"></i></Button>

                                      )
                                    }
                                  </div>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Yearly Salary"
                                  >
                                    <Form.Control type="text" placeholder="Yearly Salary" />
                                  </FloatingLabel>
                                </div>

                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Total withholding (year to date)"
                                  >
                                    <Form.Control type="text" placeholder="Total withholding (year to date)" />
                                  </FloatingLabel>
                                </div>
                                <div className="add-more-records">
                                  <Button variant="link-button" className="btn-icon-text text-info" onClick={() => { setPriorJobCount(priorJobCount + 1) }}><i className="bi bi-plus-circle"></i>Add another Prior job</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { leaveJob === LEAVEJOB.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.LEAVE_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.SIMILAR_JOB) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE); onChangeTab(ENUMFORTAB.INCOME) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }


                  {/* """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" */}
                  {
                    (questionPage === ENUMFORPAGESINCOME.ACCOUNTING_TYPE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Accounting for other income</h4>
                              <p>If you want to use your job to help pay for taxes for other sources of income, include them here. Including this information increases calculation accuracy.</p>
                            </div>
                            <div className="chk-answer-container">
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.INTEREST) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.INTEREST) }}>
                                  <div className="card-image">
                                    <img src={interestSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Interest</h6>
                                  </div>

                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="interest" value="Interest" checked={accountingType.includes(ENUMFORPAGESINCOME.INTEREST) ? true : false} />
                                      <label htmlFor="interest"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.DIVIDEND) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.DIVIDEND) }}>
                                  <div className="card-image">
                                    <img src={dividendSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Dividend</h6>
                                  </div>
                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="dividend" value="Dividend" checked={accountingType.includes(ENUMFORPAGESINCOME.DIVIDEND) ? true : false} />
                                      <label htmlFor="dividend"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.RETIREMENT) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.RETIREMENT) }}>
                                  <div className="card-image">
                                    <img src={retirementSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Retirement</h6>
                                  </div>
                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="retirement" value="Retirement" checked={accountingType.includes(ENUMFORPAGESINCOME.RETIREMENT) ? true : false} />
                                      <label htmlFor="retirement"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT) }}>
                                  <div className="card-image">
                                    <img src={selfEmploymentSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Self-employment</h6>
                                  </div>
                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="selfemployment" value="Self Employment" checked={accountingType.includes(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT) ? true : false} />
                                      <label htmlFor="selfemployment"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.UNEMPLOYEMENT) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.UNEMPLOYEMENT) }}>
                                  <div className="card-image">
                                    <img src={unemploymentSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Unemployment</h6>
                                  </div>
                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="unemployment" value="Unemployment" checked={accountingType.includes(ENUMFORPAGESINCOME.UNEMPLOYEMENT) ? true : false} />
                                      <label htmlFor="unemployment"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chk-answer-col">
                                <div className={`card-answer ${accountingType.includes(ENUMFORPAGESINCOME.NONEAPPLY) ? "active" : ""}`} onClick={() => { handleAccountingType(ENUMFORPAGESINCOME.NONEAPPLY) }}>
                                  <div className="card-image">
                                    <img src={noneApplySVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>None apply</h6>
                                  </div>
                                  <div className="chk-answer-checkbox">
                                    <div className="checkbox checkbox-primary checkbox-small">
                                      <input type="checkbox" className="filled-in" id="noneapply" value="None Apply" checked={accountingType.includes(ENUMFORPAGESINCOME.NONEAPPLY) ? true : false} />
                                      <label htmlFor="noneapply"></label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { leaveJob === LEAVEJOB.TRUE ? setquestionPage(ENUMFORPAGESABOUTUS.PRIOR_JOB) : setquestionPage(ENUMFORPAGESABOUTUS.LEAVE_JOB); onChangeTab(ENUMFORTAB.ABOUTUS); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { !isEmptyObjectOrNullUndefiend(accountingType) && handleNextAccounting() }}>Next</Button>
                        </div>
                      </>
                    )
                  }


                  {
                    (questionPage === ENUMFORPAGESINCOME.INTEREST) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Interest income</h4>
                              <p>Examples include bank deposits and bonds.</p>
                            </div>

                            <div className="form-group">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Interest Income"
                              >
                                <Form.Control type="text" placeholder="Interest Income" value={questionValues?.interest} onChange={(e) => { handleQuestionValue("interest", e.target.value) }} />
                              </FloatingLabel>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNext(ENUMFORPAGESINCOME.DIVIDEND) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}
                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESINCOME.DIVIDEND) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Dividend income</h4>
                              <p>Examples are monthly and/or quarterly ordinary dividends.</p>
                            </div>
                            <div className="forms-answer-container">

                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Divedend Income"
                                >
                                  <Form.Control type="text" placeholder="Divedend Income" value={questionValues?.dividend} onChange={(e) => { handleQuestionValue("dividend", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBack(ENUMFORPAGESINCOME.INTEREST) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNext(ENUMFORPAGESINCOME.RETIREMENT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESINCOME.RETIREMENT) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Taxable retirement income</h4>
                              <p>Examples include 401(k)s and IRAs.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Taxable retirement income"
                                >
                                  <Form.Control type="text" placeholder="Taxable retirement income" value={questionValues?.retirement} onChange={(e) => { handleQuestionValue("retirement", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBack(ENUMFORPAGESINCOME.DIVIDEND) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNext(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}
                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Self-employment income</h4>
                              <p>You can find how much tax you've already paid in withholding on your final paycheck from your previous employer.</p>
                            </div>
                            {Array.from({ length: selfEmployement }, (_, i) => (
                              <div className="forms-answer-container">
                                <div className="forms-answer-header">
                                  <h6>Income Source {i + 1}</h6>
                                  <div className="button-group">
                                    <Button variant='icon'><i className="bi bi-pencil-square"></i></Button>
                                    {(selfEmployement > 1) && (

                                      <Button variant="icon" className="text-danger" onClick={() => { (setSelfEmployement(selfEmployement - 1)) }}><i className="bi bi-trash"></i></Button>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Net Profit"
                                  >
                                    <Form.Control type="text" placeholder="Net Profit" value={questionValues?.selfEmpNetProfit} onChange={(e) => { handleQuestionValue("selfEmpNetProfit", e.target.value) }} />
                                  </FloatingLabel>
                                </div>
                                <div className="form-group">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Estimated quarterly payments"
                                  >
                                    <Form.Control type="text" placeholder="Estimated quarterly payments" value={questionValues?.selfEmpQurtPayment} onChange={(e) => { handleQuestionValue("selfEmpQurtPayment", e.target.value) }} />
                                  </FloatingLabel>
                                </div>
                                <div className="add-more-records">
                                  <Button variant="link-button" className="btn-icon-text text-info" onClick={() => { setSelfEmployement(selfEmployement + 1) }}><i className="bi bi-plus-circle"></i>Add another Prior job</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBack(ENUMFORPAGESINCOME.RETIREMENT) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNext(ENUMFORPAGESINCOME.UNEMPLOYEMENT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESINCOME.UNEMPLOYEMENT) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Unemployment income</h4>
                              <p>Taxable income from unemployment.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Umemployment income"
                                >
                                  <Form.Control type="text" placeholder="Umemployment income" value={questionValues?.unemployement} onChange={(e) => { handleQuestionValue("unemployement", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBack(ENUMFORPAGESINCOME.SELF_EMPLOYEEMENT); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESCREDIT.DEPENDENTS); onChangeTab(ENUMFORTAB.CREDIT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }
                  {/* """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" */}
                  {
                    (questionPage === ENUMFORPAGESCREDIT.DEPENDENTS) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Are you claiming any dependents?</h4>
                              <p>Include any qualifying children, relatives, or household members whom you plan to claim.</p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col">
                                <div className={`card-answer ${dependents === DEPENDENTS.TRUE ? 'active' : ''}`} onClick={() => { setDependents(DEPENDENTS.TRUE) }}>
                                  <div className="card-image">
                                    <img src={yesSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Yes</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${dependents === DEPENDENTS.FALSE ? 'active' : ''}`} onClick={() => { setDependents(DEPENDENTS.FALSE) }}>
                                  <div className="card-image">
                                    <img src={noSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>No</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { accountingType.includes(ENUMFORPAGESINCOME.NONEAPPLY) ? setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE) : handleBack(ENUMFORPAGESCREDIT.DEPENDENTS); onChangeTab(ENUMFORTAB.INCOME); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { dependents === DEPENDENTS.TRUE ? setquestionPage(ENUMFORPAGESCREDIT.DEPENDENT_INFO) : setquestionPage(ENUMFORPAGESCREDIT.OTHER_CREDIT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESCREDIT.DEPENDENT_INFO) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Tell us about your dependents</h4>
                              <p>This helps us determine which dependent-related tax breaks you might qualify for. Examples include Earned Income Tax Credit, Child Tax Credit, and Credit for Other Dependents.</p>
                            </div>
                            {Array.from({ length: dependentInfoCount }, (_, i) => (
                              <>
                                <div className="forms-answer-container">
                                  <div className="forms-answer-header">
                                    <h6>Dependent  {i + 1}</h6>
                                    <div className="button-group">
                                      <Button variant='icon'><i className="bi bi-pencil-square"></i></Button>
                                      {(dependentInfoCount > 1) && (

                                        <Button variant="icon" className="text-danger" onClick={() => { (setSelfEmployement(dependentInfoCount - 1)) }}><i className="bi bi-trash"></i></Button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Age as of Jan 1, 2024*"
                                    >
                                      <Form.Control type="text" placeholder="Age as of Jan 1, 2024*" value={questionValues?.dependentAge} onChange={(e) => { handleQuestionValue("dependentAge", e.target.value) }} />
                                    </FloatingLabel>
                                  </div>
                                  <div className="form-group">
                                    <div className="checkbox checkbox-primary checkbox-small checkbox-inline">
                                      <input type="checkbox" className="filled-in" id="student" value="Student" checked={questionValues?.dependentStudent === 'Student' ? true : false} onChange={(e) => { handleQuestionValue("dependentStudent", e.target.value) }} />
                                      <label htmlFor="student">Student</label>
                                    </div>
                                    <div className="checkbox checkbox-primary checkbox-small checkbox-inline">
                                      <input type="checkbox" className="filled-in" id="disabled" value="Disabled" checked={questionValues?.dependentDisable === 'Disabled' ? true : false} onChange={(e) => { handleQuestionValue("dependentDisable", e.target.value) }} />
                                      <label htmlFor="disabled">Disabled</label>
                                    </div>
                                    <div className="checkbox checkbox-primary checkbox-small checkbox-inline">
                                      <input type="checkbox" className="filled-in" id="liveswithme" value="Lives with me" checked={questionValues?.dependentLivesWithMe === 'Lives with me' ? true : false} onChange={(e) => { handleQuestionValue("dependentLivesWithMe", e.target.value) }} />
                                      <label htmlFor="liveswithme">Lives with me</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="add-more-records">
                                  <Button variant="link-button" className="btn-icon-text text-info" onClick={() => { setDependentInfoCount(dependentInfoCount + 1) }}><i className="bi bi-plus-circle"></i>Add another dependent</Button>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { accountingType.includes(ENUMFORPAGESINCOME.NONEAPPLY) ? setquestionPage(ENUMFORPAGESINCOME.ACCOUNTING_TYPE) : handleBack(ENUMFORPAGESCREDIT.DEPENDENTS); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESCREDIT.OTHER_CREDIT) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>


                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESCREDIT.OTHER_CREDIT) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Other credits</h4>
                              <p>Credits can reduce the amount of tax you owe or increase your refund. Accounting for them on your W-4 will increase your paycheck. Examples include the credits for child and dependent care and education.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Other Credits"
                                >
                                  <Form.Control type="text" placeholder="Other Credits" value={questionValues?.otherCredit} onChange={(e) => { handleQuestionValue("otherCredit", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { dependents === DEPENDENTS.TRUE ? setquestionPage(ENUMFORPAGESCREDIT.DEPENDENT_INFO) : setquestionPage(ENUMFORPAGESCREDIT.DEPENDENTS); onChangeTab(ENUMFORTAB.CREDIT); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => {
                            setquestionPage(ENUMFORPAGESDEDUCTION.STANDERD_DEDUCTION); onChangeTab(ENUMFORTAB.DEDUCTION);
                            setTab(ENUMFORTAB.DEDUCTION)
                          }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }
                  {/* """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" */}
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.STANDERD_DEDUCTION) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Do you want to take the standard
                                deduction?</h4>
                              <p>Select "Yes" if you're not claiming itemized deductions.

                              </p>
                            </div>
                            <div className="answer-container">
                              <div className="answer-col">
                                <div className={`card-answer ${standerdDeduction === STANDERD_DEDUCTION.TRUE ? 'active' : ''}`} onClick={() => { setStanderdDeduction(STANDERD_DEDUCTION.TRUE) }}>
                                  <div className="card-image">
                                    <img src={yesSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>Yes</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                              <div className="answer-col">
                                <div className={`card-answer ${standerdDeduction === STANDERD_DEDUCTION.FALSE ? 'active' : ''}`} onClick={() => { setStanderdDeduction(STANDERD_DEDUCTION.FALSE) }}>
                                  <div className="card-image">
                                    <img src={noSVG} alt="Muse" />
                                  </div>
                                  <div className="card-body">
                                    <h6>No</h6>
                                  </div>
                                  <div className="ans-done">
                                    <img src={ansDoneSVG} alt="Muse" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBack(ENUMFORPAGESCREDIT.DEPENDENTS); onChangeTab(ENUMFORTAB.CREDIT); }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESDEDUCTION.DEDUCTION_TYPE) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.DEDUCTION_TYPE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Which deductions apply to you?</h4>
                              <p>This calculator accounts for the most common tax situations. Choose "Other deductions" if yours is not listed.</p>
                            </div>
                            {
                              (standerdDeduction === STANDERD_DEDUCTION.TRUE) ?
                                <div className="chk-answer-container">
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.STUDENT) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.STUDENT) }}>
                                      <div className="card-image">
                                        <img src={studentLoanInterestSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Student loan interest</h6>
                                      </div>

                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="studentloaninterest2" value="Student loan interest" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.STUDENT) ? true : false} />
                                          <label htmlFor="studentloaninterest2"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.IRA) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.IRA) }}>
                                      <div className="card-image">
                                        <img src={iraContributionSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>IRA Contribution</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="iracontribution2" value="IRA Contribution" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.IRA) ? true : false} />
                                          <label htmlFor="iracontribution2"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.NON_APPLY) }}>
                                      <div className="card-image">
                                        <img src={noneApplySVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>None apply</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="noneapply3" value="None Apply" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY) ? true : false} />
                                          <label htmlFor="noneapply3"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                :

                                <div className="chk-answer-container">
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE) }} >
                                      <div className="card-image">
                                        <img src={homeMortgageInterestSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Home mortgage interest</h6>
                                      </div>

                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="homemortgageinterest" value="Home mortgage interest" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE) ? true : false} />
                                          <label htmlFor="homemortgageinterest"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.CHARITABLE) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.CHARITABLE) }} >
                                      <div className="card-image">
                                        <img src={charitableDonationsSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Charitable donations</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="iracontribution" value="Charitable donations" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.CHARITABLE) ? true : false} />
                                          <label htmlFor="iracontribution"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.LOCAL_TAX) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.LOCAL_TAX) }} >
                                      <div className="card-image">
                                        <img src={stateLooalTaxesSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>State/Local taxes</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="statelocaltaxes" value="State/Local taxes" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.LOCAL_TAX) ? true : false} />
                                          <label htmlFor="statelocaltaxes"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.MEDICAL) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.MEDICAL) }} >
                                      <div className="card-image">
                                        <img src={medicalExpensesSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Medical expenses</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="medicalexpenses" value="Medical expenses" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.MEDICAL) ? true : false} />
                                          <label htmlFor="medicalexpenses"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.STUDENT) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.STUDENT) }}  >
                                      <div className="card-image">
                                        <img src={studentLoanInterestSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Student loan interest</h6>
                                      </div>

                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="studentloaninterest2" value="Student loan interest" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.STUDENT) ? true : false} />
                                          <label htmlFor="studentloaninterest2"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.IRA) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.IRA) }} >
                                      <div className="card-image">
                                        <img src={iraContributionSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>IRA Contribution</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="iracontribution2" value="IRA Contribution" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.IRA) ? true : false} />
                                          <label htmlFor="iracontribution2"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.OTHER) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.OTHER) }}>
                                      <div className="card-image">
                                        <img src={otherDeductionsSVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>Other deductions</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="otherdeductions" value="Other deductions" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.OTHER) ? true : false} />
                                          <label htmlFor="otherdeductions"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="chk-answer-col">
                                    <div className={`card-answer ${deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY) ? 'active' : ''}`} onClick={() => { handleDeductiontype(ENUMFORPAGESDEDUCTION.NON_APPLY) }} >
                                      <div className="card-image">
                                        <img src={noneApplySVG} alt="Muse" />
                                      </div>
                                      <div className="card-body">
                                        <h6>None apply</h6>
                                      </div>
                                      <div className="chk-answer-checkbox">
                                        <div className="checkbox checkbox-primary checkbox-small">
                                          <input type="checkbox" className="filled-in" id="noneapply3" value="None Apply" checked={deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY) ? true : false} />
                                          <label htmlFor="noneapply3"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                            }
                          </div>
                        </div>
                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESCREDIT.OTHER_CREDIT) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { !isEmptyObjectOrNullUndefiend(deductionType) && handleNextDeductionType() }}>Next</Button>
                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Mortgage interest</h4>
                              <p>Include mortgage interest for your main or second home and points paid to buy a home.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Mortagage Interest"
                                >
                                  <Form.Control type="text" placeholder="Mortagage Interest" value={questionValues?.homeMortagage} onChange={(e) => { handleQuestionValue("homeMortagage", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { setquestionPage(ENUMFORPAGESDEDUCTION.DEDUCTION_TYPE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.CHARITABLE) }}>Next</Button>
                          {/* <Button variant="primary">Next</Button> */}

                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.CHARITABLE) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>2023 donations</h4>
                              <p>Include money or property donations made to qualified organizations.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="2023 Donation"
                                >
                                  <Form.Control type="text" placeholder="2023 Donation" value={questionValues?.charitable} onChange={(e) => { handleQuestionValue("charitable", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.HOME_MORTAGAGE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.LOCAL_TAX) }}>Next</Button>

                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.STUDENT) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Student loan interest</h4>
                              <p>Include student loan interest amounts for you, your spouse, and/or your dependent(s).</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Student loan interest"
                                >
                                  <Form.Control type="text" placeholder="Student loan interest" value={questionValues?.student} onChange={(e) => { handleQuestionValue("student", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.MEDICAL) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.IRA) }}>Next</Button>

                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.IRA) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Eligible IRA contributions</h4>
                              <p>Include traditional IRA contributions eligible for a deduction.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Eligible IRA contributions"
                                >
                                  <Form.Control type="text" placeholder="Eligible IRA contributions" value={questionValues?.IRA} onChange={(e) => { handleQuestionValue("IRA", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.STUDENT) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.OTHER) }}>Next</Button>

                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.LOCAL_TAX) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>State and local taxes</h4>
                              <p>Examples include state and local, real estate, and/or personal property taxes.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="State and local taxes"
                                >
                                  <Form.Control type="text" placeholder="State and local taxes" value={questionValues?.local} onChange={(e) => { handleQuestionValue("local", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.CHARITABLE) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.MEDICAL) }}>Next</Button>


                        </div>
                      </>
                    )
                  }
                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.MEDICAL) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Total anticipated medical expenses</h4>
                              <p>Enter the total of all eligible, unreimbursed medical and dental expenses. Examples include prescriptions, exams, and qualified long-term care.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Total anticipated medical expenses"
                                >
                                  <Form.Control type="text" placeholder="Total anticipated medical expenses" value={questionValues?.medical} onChange={(e) => { handleQuestionValue("medical", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.LOCAL_TAX) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { handleNextDeduction(ENUMFORPAGESDEDUCTION.STUDENT) }}>Next</Button>


                        </div>
                      </>
                    )
                  }

                  {
                    (questionPage === ENUMFORPAGESDEDUCTION.OTHER) &&
                    (
                      <>
                        <div className="card-calculator-body">
                          <div className="que-ans-container">
                            <div className="question-container">
                              <h4>Other deductions</h4>
                              <p>Examples include deductible theft and disaster losses and impairment-related work expenses.</p>
                            </div>
                            <div className="forms-answer-container">
                              <div className="form-group">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Other deductions"
                                >
                                  <Form.Control type="text" placeholder="Other deductions" value={questionValues?.other} onChange={(e) => { handleQuestionValue("other", e.target.value) }} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-calculator-footer">
                          <Button variant="white" className="btn-icon-text" onClick={() => { handleBackDeduction(ENUMFORPAGESDEDUCTION.IRA) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="primary" onClick={() => { setquestionPage(ENUMFORPAGESRESULT.FINISH) }}>Next</Button>


                        </div>
                      </>
                    )
                  }
                  {/* """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" */}
                  {/* <div className="card-calculator-body">
                    <div className="que-ans-container">
                      <div className="question-container">
                        <h4>Accounting for other income</h4>
                        <p>If you want to use your job to help pay for taxes for other sources of income, include them here. Including this information increases calculation accuracy.</p>
                      </div>
                      <div className="chk-answer-container">
                        <div className="chk-answer-col">
                          <div className="card-answer active">
                            <div className="card-image">
                              <img src={interestSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Interest</h6>
                            </div>

                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="interest" value="Interest" />
                                <label htmlFor="interest"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={dividendSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Dividend</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="dividend" value="Dividend" />
                                <label htmlFor="dividend"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={retirementSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Retirement</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="retirement" value="Retirement" />
                                <label htmlFor="retirement"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={selfEmploymentSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Self-employment</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="selfemployment" value="Self Employment" />
                                <label htmlFor="selfemployment"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={unemploymentSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Unemployment</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="unemployment" value="Unemployment" />
                                <label htmlFor="unemployment"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={noneApplySVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>None apply</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="noneapply" value="None Apply" />
                                <label htmlFor="noneapply"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-calculator-footer d-none">
                    <Button variant="white" className="btn-icon-text"><i className="bi bi-arrow-left"></i>Back</Button>
                    <Button variant="primary">Next</Button>
                  </div>

                  <div className="card-calculator-body">
                    <div className="que-ans-container">
                      <div className="question-container">
                        <h4>Which deductions apply to you?</h4>
                        <p>Even if you take the standard deduction, there are a couple other deductions you can take.</p>
                      </div>
                      <div className="chk-answer-container">
                        <div className="chk-answer-col">
                          <div className="card-answer active">
                            <div className="card-image">
                              <img src={studentLoanInterestSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>Student loan interest</h6>
                            </div>

                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="studentloaninterest" value="Student loan interest" />
                                <label htmlFor="studentloaninterest"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={iraContributionSVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>IRA Contribution</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="iracontribution" value="IRA Contribution" />
                                <label htmlFor="iracontribution"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chk-answer-col">
                          <div className="card-answer">
                            <div className="card-image">
                              <img src={noneApplySVG} alt="Muse" />
                            </div>
                            <div className="card-body">
                              <h6>None apply</h6>
                            </div>
                            <div className="chk-answer-checkbox">
                              <div className="checkbox checkbox-primary checkbox-small">
                                <input type="checkbox" className="filled-in" id="noneapply2" value="None Apply" />
                                <label htmlFor="noneapply2"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-calculator-footer d-none">
                    <Button variant="white" className="btn-icon-text"><i className="bi bi-arrow-left"></i>Back</Button>
                    <Button variant="primary">Next</Button>
                  </div> */}

                  {
                    (questionPage === ENUMFORPAGESRESULT.FINISH) && (

                      <div className="card-calculator-body card-calculator-final">
                        <div className="estimated-total">
                          <div className="estimated-total-left">
                            <h4>Your estimated total federal refund</h4>
                            <p>$1000*</p>
                          </div>
                          <div className="estimated-total-right">
                            <i className="bi bi-info-circle"></i>
                            <p>Caution! To avoid a possible underpayment penalty, the above estimate should be zero or greater.</p>
                          </div>
                        </div>

                        <div className="calculator-withholdings">
                          <h6>Adjusting your withholdings</h6>
                          <p>Use the slider(s) to adjust your refund estimate.</p>
                          <p>A larger number means lower take-home pay and tax liability. A smaller number means more take-home pay and tax liability.</p>
                        </div>

                        <div className="highest-paying-job">
                          <div className="highest-paying-job-header">
                            <h4>Highest paying job</h4>
                            <p>Job 1</p>
                          </div>
                          <div className="highest-paying-job-body">
                            <div className="highest-paying-job-left">
                              <div className="withholding-period-header">
                                <p>Additional withholding per pay period</p>
                                <h5>$25</h5>
                              </div>
                              <div className="withholding-period-body">
                                <Form.Range />
                                <div className="range-slider">
                                  <p>0</p>
                                  <p>150</p>
                                </div>
                              </div>

                            </div>
                            <div className="highest-paying-job-right">
                              <p>Total federal income tax withheld</p>
                              <h4>$25</h4>
                            </div>
                          </div>
                        </div>

                        <hr />

                        <div className="estimated-total-refund">
                          <div className="estimated-total-refund-top">
                            <h4>Your estimated total federal refund</h4>
                            <p>$1000*</p>
                          </div>
                          <div className="estimated-total-refund-bottom">
                            <p>*This is an estimate for informational purposes only. Consult your tax professional regarding your individual tax situation.</p>
                          </div>
                        </div>

                        <div className="calculator-button-group">
                          <Button variant="white" className="btn-icon-text" onClick={() => { deductionType.includes(ENUMFORPAGESDEDUCTION.NON_APPLY) ? setquestionPage(ENUMFORPAGESDEDUCTION.DEDUCTION_TYPE) : handleBackDeduction(ENUMFORPAGESRESULT.FINISH); onChangeTab(ENUMFORTAB.DEDUCTION) }}><i className="bi bi-arrow-left"></i>Back</Button>
                          <Button variant="white" onClick={() => { handleStartOver() }}>Start Over</Button>
                          <Button variant="primary">FInish</Button>
                        </div >
                      </div >
                    )
                  }


                </div >
              </div >
            </div >
          </div >
        </Modal.Body >
      </Modal >
    </>
  )
}

export default Home


