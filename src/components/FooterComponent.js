import React from 'react';

function Footer(props) {
    return(
    <div className="footer mt-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-4">
                    <h5>Địa chỉ</h5>
                    <address>
		              121, Lý Thái Tổ<br />
		              Quận Thanh Xuân<br />
		              Hà Nội<br />
		              <i className="fa fa-phone fa-lg"></i>  +84 2 1234 5678<br />
		              <i className="fa fa-fax fa-lg"></i>  +84 2 8765 4321<br />
		              <i className="fa fa-envelope fa-lg"></i> <a href="mailto:nht@funix.edu.vn">
                           funix.edu.vn</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="m-1 btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="m-1 btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="m-1 btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="m-1 btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="m-1 btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="m-1 btn btn-social-icon btn-twitter" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2021 Funix.edu.vn</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;