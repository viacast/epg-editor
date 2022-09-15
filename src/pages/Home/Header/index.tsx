import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
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
import FileSaver from 'file-saver';
import { EPGParser, Program, EPGBuilder, EPGValidator } from 'services/epg';
import { Button, FileInput, FileInputRefProps, Tooltip } from 'components';
import { LocalStorageKeys, useClickOutside, useLocalStorage } from 'hooks';
import { EntityMap } from 'utils';
import { format } from 'date-fns';
import { useModalProvider } from 'providers/ModalProvider';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import { IoIosAlert, IoIosInformationCircle } from 'react-icons/io';
import { RiAlertFill } from 'react-icons/ri';
import { MdKeyboardArrowRight } from 'react-icons/md';
import {
  HeaderContainer,
  MenuOptions,
  ExportOptions,
  Text,
  Message,
  Alerts,
  AlertsGroup,
  ContainerSettings,
  Settings,
  SettingsOption,
  ContainerTranslation,
  Translation,
  Languages,
} from './styles';

export interface HeaderProps {
  width: number;
  programs: EntityMap<Program>;
  selectedProgramId: Set<string>;
  setWidth: (val: number) => void;
  setNewPrograms: (programs: EntityMap<Program>) => void;
  handleAddProgram: () => void;
  handleClearProgramList: () => void;
}

const Header: React.FC<HeaderProps> = ({
  width,
  programs,
  selectedProgramId,
  setWidth,
  setNewPrograms,
  handleAddProgram,
  handleClearProgramList,
}) => {
  const { t, i18n } = useTranslation();
  const [programCount, setProgramCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [displayTranslation, setDisplayTranslation] = useState(false);
  const [savedFilename, setSavedFilename] = useLocalStorage(
    LocalStorageKeys.CURRENT_FILENAME,
    '',
  );
  const [epgFilename, setEpgFilename] = useState(savedFilename || '');

  const fileInputRef = useRef<FileInputRefProps>({});
  const exportOptionsRef = useRef<HTMLDivElement>(null);

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

  const [alertList, setAlertList] = useState({
    INFO: 0,
    WARN: 0,
    ERROR: 0,
  });

  useEffect(() => {
    const aux = EPGValidator.countMessages(
      EPGValidator.validate(programs.toArray()),
    );
    setAlertList(aux);
  }, [programs]);

  const [alert, setAlert] = useState({
    title: 0,
    description: 0,
    duration: 0,
    rating: 0,
    past: 0,
    future: 0,
    gap: 0,
  });

  useEffect(() => {
    const aux = EPGValidator.countAlerts(
      programs,
      EPGValidator.validate(programs.toArray()),
    );
    setAlert(aux);
  }, [programs]);

  useClickOutside(exportOptionsRef, () => setOpen(false));

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
          onClick={() => setOpen(!open)}
        />
        <ExportOptions
          ref={exportOptionsRef}
          display={!open ? 'none' : 'block'}
        >
          <Button
            text="XML"
            icon={<FaFileCode />}
            onClick={() => {
              const blob = new Blob([EPGBuilder.buildXml(programs.toArray())], {
                type: 'application/xml',
              });
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
              const blob = new Blob([EPGBuilder.buildCsv(programs.toArray())], {
                type: 'text/csv',
              });
              FileSaver.saveAs(
                blob,
                `EPG_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`,
              );
            }}
          />
        </ExportOptions>
      </MenuOptions>
      <Button
        text={t('header:buttonAddProgram')}
        icon={<CgPlayListAdd />}
        onClick={handleAddProgram}
      />
      <Button
        text={t('header:buttonClearProgramList')}
        icon={<CgPlayListRemove />}
        onClick={handleClear}
      />
      <Button
        text={t('header:buttonStartDateTime')}
        icon={<BsClockHistory />}
        onClick={() => {
          openModal({
            title: t('header:buttonStartDateTime'),
            content: t('header:adjustStartDateTime'),
            confirm: () => {
              const adjustedPrograms = EPGValidator.adjustDateTimes(
                programs.toArray(),
              );
              setNewPrograms(new EntityMap(adjustedPrograms));
              if (selectedProgramId.size === 1) {
                setWidth(width + 540);
              }
            },
          });
        }}
      />
      <>
        <ContainerSettings animate={displaySettings ? 'rotate' : 'backRotate'}>
          <IconButton
            className="epg-settings-gear"
            onClick={() => {
              setDisplaySettings(!displaySettings);
              if (displayTranslation) {
                setDisplayTranslation(!displayTranslation);
              }
            }}
          >
            <BsGearFill size="28px" color="var(--color-neutral-3)" />
          </IconButton>
          <Settings
            display={displaySettings ? 'block' : 'none'}
            onClick={() => setDisplayTranslation(!displayTranslation)}
          >
            <SettingsOption>
              <BsTranslate /> &nbsp; {t('header:epgLanguage')} &nbsp;{' '}
              <MdKeyboardArrowRight size="16px" />
            </SettingsOption>
          </Settings>
        </ContainerSettings>
        <ContainerTranslation>
          <Translation display={displayTranslation ? 'block' : 'none'}>
            <Languages onClick={() => i18n.changeLanguage('pt')}>
              {t('header:languagePt')}&nbsp;🇧🇷{' '}
              <BsCheck
                display={i18n.language === 'pt' ? 'inline-block' : 'none'}
              />
            </Languages>
            <Languages onClick={() => i18n.changeLanguage('en')}>
              {t('header:languageEn')}&nbsp;🇺🇸{' '}
              <BsCheck
                display={i18n.language === 'en' ? 'inline-block' : 'none'}
              />
            </Languages>
          </Translation>
        </ContainerTranslation>
      </>
      <Text>
        {t('header:labelProgram', {
          count: programCount,
        })}
      </Text>
      <AlertsGroup>
        <Alerts display={alertList.ERROR > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <>
                <Message display={alert.title ? 'block' : 'none'}>
                  {t('alert:noTitle')} ({alert.title})
                </Message>
                <Message display={alert.description ? 'block' : 'none'}>
                  {t('alert:noDescription')} ({alert.description})
                </Message>
                <Message display={alert.duration ? 'block' : 'none'}>
                  {t('alert:noDuration')} ({alert.duration})
                </Message>
                <Message display={alert.gap ? 'block' : 'none'}>
                  {t('alert:gapBetween')} ({alert.gap})
                </Message>
              </>
            }
          >
            <IconButton>
              {t('alert:error', {
                count: alertList.ERROR,
              })}
              &nbsp;
              <IoIosAlert size="16px" color="var(--color-system-1)" />
            </IconButton>
          </Tooltip>
        </Alerts>
        <Alerts display={alertList.WARN > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <>
                <Message display={alert.rating ? 'block' : 'none'}>
                  {t('alert:noRating')} ({alert.rating})
                </Message>
                <Message display={alert.past ? 'block' : 'none'}>
                  {t('alert:pastStartTime')} ({alert.past})
                </Message>
              </>
            }
          >
            <IconButton>
              {t('alert:warning', {
                count: alertList.WARN,
              })}
              &nbsp;
              <RiAlertFill size="16px" color="var(--color-system-2)" />
            </IconButton>
          </Tooltip>
        </Alerts>
        <Alerts display={alertList.INFO > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <Message display={alert.future ? 'block' : 'none'}>
                {t('alert:futureStartTime')} ({alert.future})
              </Message>
            }
          >
            <IconButton>
              {t('alert:info', {
                count: alertList.INFO,
              })}
              &nbsp;
              <IoIosInformationCircle
                size="16px"
                color="var(--color-neutral-3)"
              />
            </IconButton>
          </Tooltip>
        </Alerts>
      </AlertsGroup>
    </HeaderContainer>
  );
};

export default Header;
