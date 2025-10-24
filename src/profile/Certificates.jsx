import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { connect } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';

import classNames from 'classnames';
import CertificateCard from './CertificateCard';
import { certificatesSelector } from './data/selectors';
import { useIsOnTabletScreen } from './data/hooks';

const Certificates = ({ certificates }) => {
  const isTabletView = useIsOnTabletScreen();
  return (
    <div>
      <div className="col justify-content-start align-items-start g-5rem p-0">
        <div className="col align-self-stretch height-42px justify-content-start align-items-start p-0">
          <p className="font-weight-bold text-primary-500 m-0 h2">
            <FormattedMessage
              id="profile.your.certificates"
              defaultMessage="Chứng chỉ của bạn"
              description="tiêu đề cho phần chứng chỉ"
            />
          </p>
        </div>
        <div className="col justify-content-start align-items-start pt-2 p-0">
          <p className="font-weight-normal text-gray-800 m-0 p-0 p">
            <FormattedMessage
              id="profile.certificates.description"
              defaultMessage="Thông tin hồ sơ học tập của bạn chỉ hiển thị với bạn. Chỉ tên người dùng và ảnh hồ sơ của bạn mới hiển thị cho người khác trên {siteName}."
              description="mô tả của phần chứng chỉ"
              values={{
                siteName: getConfig().SITE_NAME,
              }}
            />
          </p>
        </div>
      </div>
      {certificates?.length > 0 ? (
        <div className="col">
          <div className={classNames(
            'row align-items-center pt-5 g-3rem',
            { 'justify-content-center': isTabletView },
          )}
          >
            {certificates.map(certificate => (
              <CertificateCard
                key={certificate.courseId}
                certificateType={certificate.certificateType}
                courseDisplayName={certificate.courseDisplayName}
                courseOrganization={certificate.courseOrganization}
                modifiedDate={certificate.modifiedDate}
                downloadUrl={certificate.downloadUrl}
                courseId={certificate.courseId}
                uuid={certificate.uuid}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-5">
          <FormattedMessage
            id="profile.no.certificates"
            defaultMessage="Bạn chưa có chứng chỉ nào."
            description="hiển thị khi người dùng không có chứng chỉ hoàn thành khóa học"
          />
        </div>
      )}
    </div>
  );
};

Certificates.propTypes = {
  certificates: PropTypes.arrayOf(PropTypes.shape({
    certificateType: PropTypes.string,
    courseDisplayName: PropTypes.string,
    courseOrganization: PropTypes.string,
    modifiedDate: PropTypes.string,
    downloadUrl: PropTypes.string,
    courseId: PropTypes.string.isRequired,
    uuid: PropTypes.string,
  })),
};

Certificates.defaultProps = {
  certificates: [],
};

export default connect(
  certificatesSelector,
  {},
)(Certificates);