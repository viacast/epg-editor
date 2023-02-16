import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgPlayListAdd, CgPlayListRemove, CgTrash } from 'react-icons/cg';
import {
  FaDownload,
  FaFileCode,
  FaFileCsv,
  FaFileExport,
} from 'react-icons/fa';
import {
  BsCheck,
  BsClockHistory,
  BsGearFill,
  BsTranslate,
} from 'react-icons/bs';
import {
  MdErrorOutline,
  MdKeyboardArrowLeft,
  MdNotifications,
  MdOutlineWarningAmber,
} from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { AiOutlineClear, AiOutlineInsertRowBelow } from 'react-icons/ai';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';

import { EPGParser, Program, EPGBuilder, EPGValidator } from 'services/epg';
import { AVAILABLE_LANGUAGES } from 'services/i18n';
import { Button, FileInput, FileInputRefProps, Tooltip } from 'components';
import { LocalStorageKeys, useClickOutside, useLocalStorage } from 'hooks';
import { EntityMap, ReactSetState } from 'utils';
import { useModalProvider } from 'providers/ModalProvider';
import {
  EPGValidationMessageLevel,
  EPGValidationMessageType,
} from 'services/epg/validator';
import { ColorPallete } from 'styles/global';
import {
  HeaderContainer,
  MenuOptions,
  HiddenOptionsMenu,
  Text,
  MessageType,
  Configurations,
  ContainerSettings,
  Settings,
  SettingsOption,
  Translation,
  LanguageContainer,
  Flag,
  MessageBadge,
  MessagesContainer,
  MessageBadgeContainer,
  MessageText,
  Line,
  Popover,
} from './styles';

export interface HeaderProps {
  programs: EntityMap<Program>;
  setNewPrograms: (programs: EntityMap<Program>) => void;
  handleAddProgram: () => void;
  handleClearProgramList: () => void;
  setPrograms: ReactSetState<EntityMap<Program>>;
  selectedProgram: Program | undefined;
  selectedProgramId: Set<string>;
  setSelectedProgramId: (s: Set<string>) => void;
  tableHeight: number;
  playedProgramId: Set<string>;
  setPlayedProgramId: (s: Set<string>) => void;
}

const Header: React.FC<HeaderProps> = ({
  programs,
  setNewPrograms,
  handleAddProgram,
  handleClearProgramList,
  setPrograms,
  selectedProgram,
  selectedProgramId,
  setSelectedProgramId,
  tableHeight,
  playedProgramId,
  setPlayedProgramId,
}) => {
  const { t, i18n } = useTranslation();
  const [programCount, setProgramCount] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [savedFilename, setSavedFilename] = useLocalStorage(
    LocalStorageKeys.CURRENT_FILENAME,
    '',
  );
  const [epgFilename, setEpgFilename] = useState(savedFilename || '');
  const [settingsAnimation, setSettingsAnimation] = useState(
    'none' as 'none' | 'rotate' | 'backRotate',
  );

  const fileInputRef = useRef<FileInputRefProps>({});
  const exportOptionsRef1 = useRef<HTMLDivElement>(null);
  const exportOptionsRef2 = useRef<HTMLDivElement>(null);
  const ConfigurationsRef = useRef<HTMLDivElement>(null);

  const { openModal } = useModalProvider();
  const notifyInvalidFile = useCallback(() => {
    toast(t('header:alertInvalidFile'), {
      type: 'warning',
    });
    fileInputRef.current.clearFiles?.();
  }, [t]);

  useEffect(() => {
    setProgramCount(programs.count);
  }, [programs.count]);

  const handleFileUpload = useCallback(
    async files => {
      if (!files.length) {
        return;
      }
      const [file] = files;
      if (file.type !== 'text/xml' && file.type !== 'text/csv') {
        notifyInvalidFile();
        return;
      }
      let newPrograms: Program[];
      try {
        newPrograms = await EPGParser.parseFile(file);
      } catch (e) {
        notifyInvalidFile();
        return;
      }
      if (!programCount) {
        setNewPrograms(new EntityMap(newPrograms));
        setEpgFilename(file.name);
        setSavedFilename(file.name);
        return;
      }
      openModal({
        title: t('header:titleOverwrite'),
        content: t('header:overwriteProgramList'),
        confirm: () => {
          setNewPrograms(new EntityMap(newPrograms));
          setEpgFilename(file.name);
          setSavedFilename(file.name);
        },
      });
    },
    [
      programCount,
      openModal,
      t,
      notifyInvalidFile,
      setNewPrograms,
      setSavedFilename,
    ],
  );

  const handleClear = useCallback(() => {
    openModal({
      title: t('header:buttonClearProgramList'),
      content: t('header:clearProgramList'),
      confirm: () => {
        setEpgFilename('');
        setSavedFilename('');
        handleClearProgramList();
        fileInputRef.current.clearFiles?.();
      },
    });
  }, [handleClearProgramList, openModal, setSavedFilename, t]);

  const [messageCountByLevel, setMessageCountByLevel] = useState(
    {} as Record<EPGValidationMessageLevel, number>,
  );

  useEffect(() => {
    const count = EPGValidator.countMessagesByLevel(
      EPGValidator.validate(programs.toArray()),
    );
    setMessageCountByLevel(count);
  }, [programs]);

  const [messageCountByType, setMessageCountByType] = useState(
    {} as Record<EPGValidationMessageType, number>,
  );

  useEffect(() => {
    const count = EPGValidator.countMessagesByType(
      programs,
      EPGValidator.validate(programs.toArray()),
    );
    setMessageCountByType(count);
  }, [programs]);

  useClickOutside(exportOptionsRef1, () => setOpen1(false));
  useClickOutside(exportOptionsRef2, () => setOpen2(false));
  useClickOutside(ConfigurationsRef, () => {
    setShowSettings(false);
    setShowTranslation(false);
  });

  useEffect(() => {
    setSettingsAnimation(a => {
      if (a === 'none') {
        return 'none';
      }
      return showSettings ? 'rotate' : 'backRotate';
    });
  }, [showSettings]);

  const [anchorEl, setAnchorEl] = useState([false, false, false, false, false]);

  const handlePopover1 = () => {
    anchorEl[0] = !anchorEl[0];
    setAnchorEl(anchorEl);
  };
  const handlePopover2 = () => {
    anchorEl[1] = !anchorEl[1];
    setAnchorEl(anchorEl);
  };
  const handlePopover3 = () => {
    anchorEl[2] = !anchorEl[2];
    setAnchorEl(anchorEl);
  };
  const handlePopover4 = () => {
    anchorEl[3] = !anchorEl[3];
    setAnchorEl(anchorEl);
  };
  const handlePopover5 = () => {
    anchorEl[4] = !anchorEl[4];
    setAnchorEl(anchorEl);
  };

  return (
    <HeaderContainer className="no-user-select">
      <FileInput
        className="epg-input"
        forwardRef={fileInputRef}
        disabled
        placeholder={
          epgFilename !== '' ? epgFilename : t('header:placeholderInput')
        }
        onFileUpload={async files => {
          await handleFileUpload(files);
          fileInputRef.current.clearFiles?.();
        }}
      />
      <Button
        text={t('header:buttonImportProgram')}
        icon={<FaDownload />}
        onClick={() => {
          fileInputRef?.current.click?.();
        }}
      />
      <MenuOptions>
        <Button
          text={t('header:buttonExportProgram')}
          icon={<FaFileExport />}
          onClick={() => setOpen1(!open1)}
        />
        {open1 && (
          <HiddenOptionsMenu ref={exportOptionsRef1}>
            <Button
              text="XML"
              icon={<FaFileCode />}
              onClick={() => {
                const blob = new Blob(
                  [EPGBuilder.buildXml(programs.toArray())],
                  {
                    type: 'application/xml',
                  },
                );
                FileSaver.saveAs(
                  blob,
                  `EPG_${format(new Date(), 'yyyyMMdd_HHmmss')}.xml`,
                );
              }}
            />
            <Button
              text="CSV"
              icon={<FaFileCsv />}
              onClick={() => {
                const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
                const blob = new Blob(
                  [BOM, EPGBuilder.buildCsv(programs.toArray())],
                  {
                    type: 'text/csv',
                  },
                );
                FileSaver.saveAs(
                  blob,
                  `EPG_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`,
                );
              }}
            />
          </HiddenOptionsMenu>
        )}
      </MenuOptions>
      <Button
        text={t('header:buttonAddProgram')}
        icon={<CgPlayListAdd />}
        onClick={handleAddProgram}
      />
      <MenuOptions>
        <div onMouseEnter={handlePopover1} onMouseLeave={handlePopover1}>
          <Button
            text={t('header:buttonClear')}
            icon={<AiOutlineClear />}
            onClick={() => setOpen2(!open2)}
          />
        </div>
        <Popover
          top="110px"
          left="735px"
          display={anchorEl[0] && !open2 ? 'block' : 'none'}
        >
          {t('header:clearPopover')}
        </Popover>
        {open2 && (
          <HiddenOptionsMenu ref={exportOptionsRef2}>
            <div onMouseEnter={handlePopover2} onMouseLeave={handlePopover2}>
              <Button
                text={t('header:buttonClearProgramList')}
                icon={<CgPlayListRemove />}
                onClick={handleClear}
              />
            </div>
            <Popover
              top="110px"
              left="15px"
              display={anchorEl[1] ? 'block' : 'none'}
            >
              {t('header:clearProgramListPopover')}
            </Popover>
            <div onMouseEnter={handlePopover5} onMouseLeave={handlePopover5}>
              <Button
                text={t('header:buttonWipe')}
                icon={<AiOutlineInsertRowBelow />}
                onClick={() => {
                  if (!playedProgramId) {
                    return;
                  }
                  openModal({
                    title: t('menu:deleteProgramTitle'),
                    content: t('header:deleteProgramFromList', {
                      count: playedProgramId.size,
                    }),
                    confirm: () => {
                      Array.from(playedProgramId).forEach(pid => {
                        const index = programs.indexOf(pid);
                        const idList: Set<string> = new Set();
                        idList.add(programs.at(index + 1)?.id ?? '');
                        setPlayedProgramId(idList);
                        setPrograms(p => p.remove(pid).clone());
                      });
                    },
                  });
                }}
              />
            </div>
            <Popover
              top="110px"
              className="epg-button-menu"
              left="15px"
              display={anchorEl[4] ? 'block' : 'none'}
            >
              {t('header:wipePopover')}
            </Popover>
          </HiddenOptionsMenu>
        )}
      </MenuOptions>
      <Button
        text={t('header:buttonDeleteSelectedProgram')}
        icon={<CgTrash />}
        onClick={() => {
          if (!selectedProgram) {
            return;
          }
          openModal({
            title: t('menu:deleteProgramTitle'),
            content: t('header:deleteProgramFromList', {
              count: selectedProgramId.size,
            }),
            confirm: () => {
              Array.from(selectedProgramId).forEach(pid => {
                const size = programs.toArray().length;
                const index = programs.indexOf(pid);
                const idList: Set<string> = new Set();
                if (size === 1) {
                  // was the only program on the list
                  selectedProgramId.delete(pid);
                } else if (index === size - 1) {
                  // was the last program on the list
                  idList.add(programs.at(index - 1)?.id ?? '');
                  setSelectedProgramId(idList);
                } else {
                  // all other cases
                  idList.add(programs.at(index + 1)?.id ?? '');
                  setSelectedProgramId(idList);
                }
                setPrograms(p => p.remove(pid).clone());
              });
            },
          });
        }}
      />
      <div onMouseEnter={handlePopover3} onMouseLeave={handlePopover3}>
        <Button
          text={t('header:buttonAdjustStartDateTime')}
          icon={<BsClockHistory />}
          onClick={() => {
            openModal({
              title: t('header:buttonAdjustStartDateTime'),
              content: t('header:alertAdjustStartDateTime'),
              confirm: () => {
                const adjustedPrograms = EPGValidator.adjustDateTimes(
                  programs.toArray(),
                );
                setNewPrograms(new EntityMap(adjustedPrograms));
              },
            });
          }}
        />
      </div>
      <Popover
        top="105px"
        left="1035px"
        display={anchorEl[2] ? 'block' : 'none'}
      >
        {t('header:adjustStartDateTimePopover')}
      </Popover>
      <div onMouseEnter={handlePopover4} onMouseLeave={handlePopover4}>
        <Button
          text={t('header:buttonScrollDown')}
          icon={<HiOutlineChevronDoubleDown />}
          onClick={() => {
            const objDiv = document.getElementsByClassName(
              'ReactVirtualized__Grid',
            )[0];
            if (objDiv) {
              objDiv.scrollTo({
                top: tableHeight,
                left: 0,
                behavior: 'smooth',
              });
            }
          }}
        />
      </div>
      <Popover
        top="105px"
        left="1185px"
        display={anchorEl[3] ? 'block' : 'none'}
      >
        {t('header:scrollDownPopover')}
      </Popover>
      <Tooltip
        arrow
        title={
          <>
            <Text>
              {t('header:programCount', {
                count: programCount,
              })}
            </Text>
            {messageCountByLevel.ALL > 0 && <Line />}
            {messageCountByLevel.ERROR > 0 && (
              <>
                <MessageType>
                  {t('messages:error', {
                    count: messageCountByLevel.ERROR,
                  })}
                  <MdErrorOutline color={ColorPallete.NEUTRAL_2} />
                </MessageType>
                {Object.entries(messageCountByType).map(([type, count]) =>
                  EPGValidator.getMessageLevel(
                    type as EPGValidationMessageType,
                  ) === EPGValidationMessageLevel.ERROR && count > 0 ? (
                    <MessageText key={`message-${type}`}>
                      {t(`messages:message_${type}`)} ({count})
                    </MessageText>
                  ) : null,
                )}
              </>
            )}
            {messageCountByLevel.WARN > 0 && (
              <>
                <MessageType>
                  {t('messages:warn', {
                    count: messageCountByLevel.WARN,
                  })}
                  <MdOutlineWarningAmber color={ColorPallete.NEUTRAL_2} />
                </MessageType>
                {Object.entries(messageCountByType).map(([type, count]) =>
                  EPGValidator.getMessageLevel(
                    type as EPGValidationMessageType,
                  ) === EPGValidationMessageLevel.WARN && count > 0 ? (
                    <MessageText key={`message-${type}`}>
                      {t(`messages:message_${type}`)} ({count})
                    </MessageText>
                  ) : null,
                )}
              </>
            )}
            {messageCountByLevel.INFO > 0 && (
              <>
                <MessageType>
                  {t('messages:info', {
                    count: messageCountByLevel.INFO,
                  })}
                  <IoIosInformationCircleOutline
                    color={ColorPallete.NEUTRAL_2}
                  />
                </MessageType>
                {Object.entries(messageCountByType).map(([type, count]) =>
                  EPGValidator.getMessageLevel(
                    type as EPGValidationMessageType,
                  ) === EPGValidationMessageLevel.INFO && count > 0 ? (
                    <MessageText key={`message-${type}`}>
                      {t(`messages:message_${type}`)} ({count})
                    </MessageText>
                  ) : null,
                )}
              </>
            )}
          </>
        }
      >
        <MessagesContainer>
          <MessageBadgeContainer>
            {messageCountByLevel.INFO > 0 && (
              <MessageBadge
                variant="dot"
                backgroundColor={ColorPallete.NEUTRAL_3}
              />
            )}
            {messageCountByLevel.WARN > 0 && (
              <MessageBadge
                variant="dot"
                backgroundColor={ColorPallete.SYSTEM_2}
              />
            )}
            {messageCountByLevel.ERROR > 0 && (
              <MessageBadge
                variant="dot"
                backgroundColor={ColorPallete.SYSTEM_1}
              />
            )}
          </MessageBadgeContainer>
          <MdNotifications size="28px" color="action" />
        </MessagesContainer>
      </Tooltip>
      <Configurations ref={ConfigurationsRef}>
        <ContainerSettings animation={settingsAnimation}>
          <IconButton
            className="epg-settings-gear"
            onClick={() => {
              setSettingsAnimation('rotate');
              setShowSettings(s => !s);
              setShowTranslation(false);
            }}
          >
            <BsGearFill size="28px" color={ColorPallete.NEUTRAL_3} />
          </IconButton>
          {showSettings && (
            <Settings onClick={() => setShowTranslation(s => !s)}>
              <SettingsOption>
                {t('header:settingsLanguage')} &nbsp; <BsTranslate /> &nbsp;{' '}
                <MdKeyboardArrowLeft
                  className="epg-language-arrow"
                  size="16px"
                />
              </SettingsOption>
            </Settings>
          )}
        </ContainerSettings>
        {showTranslation && (
          <Translation>
            {AVAILABLE_LANGUAGES.map(({ code, flag }) => (
              <LanguageContainer onClick={() => i18n.changeLanguage(code)}>
                {t(`header:settingsLanguage_${code}`)}
                <BsCheck opacity={i18n.resolvedLanguage === code ? '1' : '0'} />
                <Flag>{flag}</Flag>
              </LanguageContainer>
            ))}
          </Translation>
        )}
      </Configurations>
      <Tooltip title={t('header:help')}>
        <IconButton
          onClick={() => {
            const link = document.createElement('a');
            link.download = 'Manual_EPG_Editor.pdf';
            link.href = './ManualEPGEditor.pdf';
            link.click();
          }}
        >
          <BiHelpCircle size="32px" color={ColorPallete.NEUTRAL_3} />
        </IconButton>
      </Tooltip>
    </HeaderContainer>
  );
};

export default Header;
