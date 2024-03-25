/* eslint-disable */-bs-toggle
import React from "react";
import '../App.css';

function Side({ isSidebarOpen, toggleSidebar }) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* 사이드바 내용 */}
       

        <a href="/" className="brand-link">
          <img src="dist/img/logo_W.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"  />
          <span className="brand-text font-weight-light">VOICE CATCH</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar" >
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"> 
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Admin</a>
            </div>
          </div>
         
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
               
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                        오류
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview sub"  style={{  paddingLeft: '30px' }}>
                    <li className="nav-item " style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/error" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px',  marginLeft: '30px'}} />
                          <p style={{ margin: 0 }}>오류관리</p>
                        </a>
                      </li>
                      <li className="nav-item " style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/errorlog" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px', marginLeft: '30px' }} />
                          <p style={{ margin: 0 }}>오류로그</p>
                        </a>
                      </li>
                      
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                        차트
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview sub" style={{  paddingLeft: '30px' }}>
                    <li className="nav-item" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/day" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px',  marginLeft: '30px'}} />
                          <p style={{ margin: 0 }}>Day/Month</p>
                        </a>
                      </li>
                      <li className="nav-item" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/label" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px', marginLeft: '30px' }} />
                          <p style={{ margin: 0 }}>피싱 종류별</p>
                        </a>
                      </li>
                      <li className="nav-item" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/frequency" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px' , marginLeft: '30px'}} />
                          <p style={{ margin: 0 }}>발생빈도</p>
                        </a>
                      </li>
                      
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-table" />
                      <p>
                        조회
                        <i className="fas fa-angle-left right" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview sub" style={{  paddingLeft: '30px' }}>
                    <li className="nav-item" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/phishing" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px' , marginLeft: '30px'}} />
                          <p style={{ margin: 0 }}>피싱번호조회</p>
                        </a>
                      </li>

                      <li className="nav-item" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                        <a href="/user" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                          <img src="dist/img/subicon.png" className="subicon" style={{ width: '15px', height: '15px', marginRight: '8px' , marginLeft: '30px'}} />
                          <p style={{ margin: 0 }}>회원관리</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
  
    );
  }
 

export default Side;
