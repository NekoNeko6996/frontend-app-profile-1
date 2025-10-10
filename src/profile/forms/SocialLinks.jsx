import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Hyperlink } from '@openedx/paragon';
import { connect } from 'react-redux';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import FormControls from './elements/FormControls';
import EditableItemHeader from './elements/EditableItemHeader';
import EmptyContent from './elements/EmptyContent';
import SwitchContent from './elements/SwitchContent';

import { editableFormSelector } from '../data/selectors';
import { useIsVisibilityEnabled } from '../data/hooks';

// new import here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const platformDisplayInfo = {
  facebook: {
    icon: faFacebook,
    name: 'Facebook',
  },
  twitter: {
    icon: faTwitter,
    name: 'X',
  },
  linkedin: {
    icon: faLinkedin,
    name: 'LinkedIn',
  },
};

const SocialLinks = ({
  formId,
  socialLinks,
  draftSocialLinksByPlatform,
  visibilitySocialLinks,
  editMode,
  saveState,
  error,
  changeHandler,
  submitHandler,
  closeHandler,
  openHandler,
}) => {
  const isVisibilityEnabled = useIsVisibilityEnabled();
  const [activePlatform, setActivePlatform] = useState(null);

  const mergeWithDrafts = (newSocialLink) => {
    const knownPlatforms = ['twitter', 'facebook', 'linkedin'];
    const updated = [];
    knownPlatforms.forEach((platform) => {
      if (newSocialLink.platform === platform) {
        updated.push(newSocialLink);
      } else if (draftSocialLinksByPlatform[platform] !== undefined) {
        updated.push(draftSocialLinksByPlatform[platform]);
      }
    });
    return updated;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'visibilitySocialLinks') {
      changeHandler(
        'socialLinks',
        mergeWithDrafts({
          platform: name,
          socialLink: value,
        }),
      );
    } else {
      changeHandler(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler(formId);
    setActivePlatform(null);
  };

  const handleClose = () => {
    closeHandler(formId);
    setActivePlatform(null);
  };

  const handleOpen = (platform) => {
    openHandler(formId);
    setActivePlatform(platform);
  };

  const renderPlatformContent = (platform, socialLink, isEditing) => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="form-group m-0">
            {error !== null && (
              <div id="social-error-feedback">
                <Alert variant="danger" dismissible={false} show>
                  {error}
                </Alert>
              </div>
            )}
            <div className="pb-3">
              <input
                className={classNames('form-control py-10px', { 'is-invalid': Boolean(error) })}
                type="text"
                id={`social-${platform}`}
                name={platform}
                value={socialLink || ''}
                onChange={handleChange}
                aria-describedby="social-error-feedback"
              />
            </div>
            <FormControls
              visibilityId="visibilitySocialLinks"
              saveState={saveState}
              visibility={visibilitySocialLinks}
              cancelHandler={handleClose}
              changeHandler={handleChange}
              submitHandler={handleSubmit}
            />
          </div>
        </form>
      );
    }
    if (socialLink) {
      const href = normalizeUrl(socialLink);
      return (
        <div className="w-100 overflowWrap-breakWord">
          <EditableItemHeader
            content={(
              <Hyperlink destination={href} target="_blank" rel="noopener noreferrer">
                {viewLabel(platform)}
              </Hyperlink>
            )}
            showEditButton
            onClickEdit={() => handleOpen(platform)}
            showVisibility={visibilitySocialLinks !== null && isVisibilityEnabled}
            visibility={visibilitySocialLinks}
          />
        </div>
      );
    }
    return (
      <EmptyContent onClick={() => handleOpen(platform)}>
        Add {platformDisplayInfo[platform].name}
      </EmptyContent>
    );
  };

  // new is here
  const normalizeUrl = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);
  const viewLabel = (platform) => `View my ${platformDisplayInfo[platform].name} profile`;


  return (
    <SwitchContent
      className="pt-0 profile-field-card"
      expression={editMode}
      cases={{
        empty: (
          <div>
            <div>
              {socialLinks.map(({ platform }) => (
                <div key={platform} className="pt-40px">
                  <p data-hj-suppress className="h5 font-weight-bold m-0 pb-1.5 label-with-icon">
                    <FontAwesomeIcon icon={platformDisplayInfo[platform].icon} className="social-icon" aria-hidden />
                    {platformDisplayInfo[platform].name}
                  </p>
                  <EmptyContent onClick={() => handleOpen(platform)}>
                    <FormattedMessage
                      id="profile.sociallinks.add"
                      defaultMessage="Add {network} profile"
                      values={{
                        network: platformDisplayInfo[platform].name,
                      }}
                      description="{network} is the name of a social network such as Facebook or Twitter"
                    />
                  </EmptyContent>
                </div>
              ))}
            </div>
          </div>
        ),
        static: (
          <div>
            <div>
              {socialLinks
                .filter(({ socialLink }) => Boolean(socialLink))
                .map(({ platform, socialLink }) => (
                  <div key={platform} className="pt-40px">
                    <p data-hj-suppress className="h5 font-weight-bold m-0 pb-1.5 label-with-icon">
                      <FontAwesomeIcon icon={platformDisplayInfo[platform].icon} className="social-icon" aria-hidden />
                      {platformDisplayInfo[platform].name}
                    </p>
                    <EditableItemHeader
                      content={(
                        <Hyperlink destination={normalizeUrl(socialLink)} target="_blank" rel="noopener noreferrer">
                          {viewLabel(platform)}
                        </Hyperlink>
                      )}
                    />
                  </div>
                ))}
            </div>
          </div>
        ),
        editable: (
          <div>
            <div>
              {socialLinks.map(({ platform, socialLink }) => (
                <div key={platform} className="pt-40px">
                  <p data-hj-suppress className="h5 font-weight-bold m-0 pb-1.5 label-with-icon">
                    <FontAwesomeIcon icon={platformDisplayInfo[platform].icon} className="social-icon" aria-hidden />
                    {platformDisplayInfo[platform].name}
                  </p>
                  {renderPlatformContent(platform, socialLink, activePlatform === platform)}
                </div>
              ))}
            </div>
          </div>
        ),
        editing: (
          <div>
            <div>
              {socialLinks.map(({ platform, socialLink }) => (
                <div key={platform} className="pt-40px">
                  <p data-hj-suppress className="h5 font-weight-bold m-0 pb-1.5 label-with-icon">
                    <FontAwesomeIcon icon={platformDisplayInfo[platform].icon} className="social-icon" aria-hidden />
                    {platformDisplayInfo[platform].name}
                  </p>
                  {renderPlatformContent(platform, socialLink, activePlatform === platform)}
                </div>
              ))}
            </div>
          </div>
        ),
      }}
    />
  );
};

SocialLinks.propTypes = {
  formId: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    platform: PropTypes.string,
    socialLink: PropTypes.string,
  })).isRequired,
  draftSocialLinksByPlatform: PropTypes.objectOf(PropTypes.shape({
    platform: PropTypes.string,
    socialLink: PropTypes.string,
  })),
  visibilitySocialLinks: PropTypes.oneOf(['private', 'all_users']),
  editMode: PropTypes.oneOf(['editing', 'editable', 'empty', 'static']),
  saveState: PropTypes.string,
  error: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  openHandler: PropTypes.func.isRequired,
};

SocialLinks.defaultProps = {
  editMode: 'static',
  saveState: null,
  draftSocialLinksByPlatform: {},
  visibilitySocialLinks: 'private',
  error: null,
};

export default connect(
  editableFormSelector,
  {},
)(SocialLinks);
