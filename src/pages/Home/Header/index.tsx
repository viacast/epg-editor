import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import {
  FaDownload,
  FaFileCode,
  FaFileCsv,
  FaFileExport,
} from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
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
import {
  HeaderContainer,
  MenuOptions,
  ExportOptions,
  Select,
  Text,
  Alerts,
  AlertsGroup,
} from './styles';

export interface HeaderProps {
  width: number;
  programs: EntityMap<Program>;
  setWidth: (val: number) => void;
  setNewPrograms: (programs: EntityMap<Program>) => void;
  handleAddProgram: () => void;
  handleClearProgramList: () => void;
}

const Header: React.FC<HeaderProps> = ({
  width,
  programs,
  setWidth,
  setNewPrograms,
  handleAddProgram,
  handleClearProgramList,
}) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(0);
  const [open, setOpen] = useState(false);
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

  const handleChange = useCallback(
    evt => {
      const { value } = evt.target;
      setCurrentLanguage(value);
      i18n.changeLanguage(value);
    },
    [i18n],
  );

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
              setWidth(width + 540);
            },
          });
        }}
      />
      <Text>
        {t('header:labelProgram', {
          count: programCount,
        })}
      </Text>
      <Select onChange={handleChange} value={currentLanguage}>
        <option value="pt">Portugues</option>
        <option value="en">English</option>
      </Select>
      <AlertsGroup>
        <Alerts display={alertList.ERROR > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <>
                {alert.title} {t('alert:emptyText')} <br />
                {alert.description} {t('alert:emptyText')} <br />
                {alert.duration} {t('alert:noDuration')} <br />
                {alert.gap} {t('alert:gapBetween')} <br />
              </>
            }
          >
            <IconButton>
              {t('alert:error', {
                count: alertList.ERROR,
              })}
              &nbsp;
              <IoIosAlert size="28px" color="var(--color-system-1)" />
            </IconButton>
          </Tooltip>
        </Alerts>
        <Alerts display={alertList.WARN > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <>
                {alert.rating} {t('alert:noRating')} <br />
                {alert.past} {t('alert:pastStartTime')} <br />
              </>
            }
          >
            <IconButton>
              {t('alert:warning', {
                count: alertList.WARN,
              })}
              &nbsp;
              <RiAlertFill size="28px" color="var(--color-system-2)" />
            </IconButton>
          </Tooltip>
        </Alerts>
        <Alerts display={alertList.INFO > 0 ? 'block' : 'none'}>
          <Tooltip
            arrow
            title={
              <>
                {alert.future} {t('alert:futureStartTime')}
              </>
            }
          >
            <IconButton>
              {t('alert:info', {
                count: alertList.INFO,
              })}
              &nbsp;
              <IoIosInformationCircle
                size="28px"
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
